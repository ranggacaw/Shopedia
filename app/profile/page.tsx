"use client"

import Header from "@/components/Header";
import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTimes } from "react-icons/fa";

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);

    // State user data
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (123) 456-7890",
    });

    // State edited data
    const [editedUser, setEditedUser] = useState({ ...user });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle edit button click
    const handleEditClick = () => {
        setEditedUser({ ...user }); // Reset edited data to current user data
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    // Handle save button click
    const handleSaveClick = () => {
        setUser({ ...editedUser }); // Update user data
        setIsEditing(false);

        console.log("Updated User Data:", editedUser);
    };

    return (
        <>
            <Header/>

            <div className="container mx-auto p-6">
                {/* Profile Header */}
                <section className="text-center py-8">
                    <h1 className="text-4xl font-bold mb-4">Profile</h1>
                    <p className="text-lg text-gray-600">
                        Manage your profile information and keep it up to date.
                    </p>
                </section>

                {/* Profile Form */}
                <section className="max-w-2xl mx-auto">
                    <div className="card border border-base-300 shadow-sm p-6">
                        {/* Name */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    Name
                                </span>
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedUser.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    Email
                                </span>
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedUser.email}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            ) : (
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            )}
                        </div>

                        {/* Phone */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text flex items-center">
                                    Phone
                                </span>
                            </label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editedUser.phone}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                            ) : (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={user.phone}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            )}
                        </div>

                        {/* Edit/Cancel/Save Buttons */}
                        <div className="flex justify-end space-x-4">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleCancelClick}
                                        className="btn btn-ghost"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveClick}
                                        className="btn btn-primary"
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleEditClick}
                                    className="btn btn-outline btn-primary"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProfilePage;