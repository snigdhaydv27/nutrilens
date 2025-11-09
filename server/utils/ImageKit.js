import ImageKit from "imagekit";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadOnImageKit = async (localFilePath, userName) => {
    try {
        if (!localFilePath) return null;

        // Read file and convert to base64
        const fileBuffer = fs.readFileSync(localFilePath);
        const base64File = fileBuffer.toString('base64');

        const response = await imagekit.upload({
            file: base64File,
            fileName: `${userName}_${Date.now()}`,
            folder: '/users'
        });

        // Delete local file after successful upload
        fs.unlinkSync(localFilePath);

        return {
            error: false,
            url: response.url,
            fileId: response.fileId
        };

    } catch (error) {
        // Delete local file even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return {
            error: true,
            message: error.message || "Error uploading image to ImageKit"
        };
    }
}

const uploadProductOnImageKit = async (localFilePath, productId) => {
    try {
        if (!localFilePath) return null;

        // Read file and convert to base64
        const fileBuffer = fs.readFileSync(localFilePath);
        const base64File = fileBuffer.toString('base64');

        const response = await imagekit.upload({
            file: base64File,
            fileName: `${productId}_${Date.now()}`,
            folder: '/proucts',
            extensions: [
                {
                    name: "remove-bg",
                    options: {
                        add_shadow: true,
                        bg_color: "FFFFFF", 
                    }
                }
            ]
        });

        // Delete local file after successful upload
        fs.unlinkSync(localFilePath);

        return {
            error: false,
            url: response.url,
            fileId: response.fileId
        };

    } catch (error) {
        // Delete local file even if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return {
            error: true,
            message: error.message || "Error uploading image to ImageKit"
        };
    }
}

export { uploadOnImageKit, uploadProductOnImageKit };