import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const getUserById = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;

    const user = await getUserDetailsById(userId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user,
            },
            "User fetched successfully"
        )
    );
});

export const getUserDetailsById = async (userId) => {
    // console.log(`Getting user by ID: ${userId}`);
    userId = userId || req.params.id;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // console.log(user);

    return user;
};

export const generateAccessAndRefreshToken = async (userId) => {
    // console.log(userId);
    try {
        const user = await getUserDetailsById(userId);
        // console.log(user);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // console.log(`AccessToken : ${accessToken} refreshToken: ${refreshToken}`);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
}

export const registerUser = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    const { fullName, email, username, password } = req.body;
    // console.log(`email: ${email}`);

    if (
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields is required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists");
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password
    });

    const createdUser = await getUserDetailsById(user._id);
    // console.log(createdUser);

    if (!createdUser) {
        throw new ApiError(500, "Something Went Wrong while creating a new user.")
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            {
                createdUser,
            },
            "User Created Successfully"
        )
    )
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    // console.log(`username: ${username}, email: ${email}`)

    if (!username && !email) {
        throw new ApiError(400, "Username or Email is Required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User doesn't exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect Password.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // console.log(`AccessToken : ${accessToken} refreshToken: ${refreshToken}`);

    const loggedInUser = await getUserDetailsById(user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged In Successfully!"
            )
        )
})

export const logoutUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        {
            new: true,
        }
    ).select("-password");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {
                    user: user,
                },
                "User logged out successfully"
            )
        );
});