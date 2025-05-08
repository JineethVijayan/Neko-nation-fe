import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axiosInstance from "../../config/axiosInstance";

const AddPoster = () => {
    const { register, handleSubmit, reset } = useForm();
    const cropperRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImages, setCroppedImages] = useState([]); // Stores multiple cropped images

    const CROP_WIDTH = 1300;
    const CROP_HEIGHT = 400;

    // Handle file selection
    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageSrc(URL.createObjectURL(file));
        }
    };

    // Crop Image and Store in Array
    const cropImage = () => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper;
            const canvas = cropper.getCroppedCanvas({ width: CROP_WIDTH * 2, height: CROP_HEIGHT * 2 });

            if (canvas) {

                const ctx = canvas.getContext("2d");
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = "high";

                canvas.toBlob((blob) => {
                    const croppedImageURL = URL.createObjectURL(blob);
                    setCroppedImages((prev) => [...prev, { url: croppedImageURL, file: blob }]);
                    setImageSrc(null); // Clear cropper for next image
                }, "image/png", 1.0);
            }
        }
    };

    // Handle form submission
    const onSubmit = async (data) => {
        if (croppedImages.length === 0) {
            alert("Please add at least one image before submitting.");
            return;
        }

        const formData = new FormData();

        // Append all cropped images to FormData
        croppedImages.forEach((image, index) => {
            formData.append("images", image.file, `cropped-image-${index}.jpg`);
        });

        try {
            await axiosInstance.post("/poster/create-poster", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Upload successful!");
            reset();
            setCroppedImages([]); // Clear images after successful upload
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
        }
    };

    return (
        <div className="p-4 pt-24">
            <h2 className="text-2xl font-bold mb-4">Add Poster</h2>

            <form onSubmit={handleSubmit(onSubmit)}>


                <div className="mb-4">
                    <label className="block mb-2">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="border p-2 w-full"
                    />
                </div>

                {imageSrc && (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Crop Image</h3>
                        <Cropper
                            src={imageSrc}
                            style={{ height: 300, width: "100%" }}
                            initialAspectRatio={CROP_WIDTH / CROP_HEIGHT}
                            aspectRatio={CROP_WIDTH / CROP_HEIGHT}
                            guides={false}
                            ref={cropperRef}
                            viewMode={1}
                            dragMode="move"
                            cropBoxResizable={false}
                            cropBoxMovable={false}
                            ready={(e) => {
                                const cropper = e.target.cropper;
                                cropper.setCropBoxData({
                                    width: CROP_WIDTH,
                                    height: CROP_HEIGHT
                                });
                            }}
                        />
                        <button
                            type="button"
                            onClick={cropImage}
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Confirm Crop & Add Image
                        </button>
                    </div>
                )}

                {croppedImages.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Selected Images</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {croppedImages.map((img, index) => (
                                <div key={index} className="relative">
                                    <img src={img.url} alt={`Cropped ${index}`} className="border rounded" width={CROP_WIDTH} height={CROP_HEIGHT} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 rounded"
                    disabled={croppedImages.length === 0}
                >
                    Upload All Images
                </button>
            </form>
        </div>
    );
};

export default AddPoster;
