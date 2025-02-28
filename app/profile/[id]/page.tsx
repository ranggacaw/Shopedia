"use client";

import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Define User Type
interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
}

const ProfilePage = () => {
  
    const { id } = useParams();
    const userId = Number(id);
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch token and user data
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }

        setToken(storedToken);

        if (isNaN(userId)) {
            setError("Invalid user ID.");
            setLoading(false);
            console.error("Invalid user ID:", id);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/auth/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user details");

                const data: User = await response.json();
                setUser(data);
                setEditedUser(data);
            } catch (err) {
                setError("Failed to load user details.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedUser) return;
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    // Save updated user details
    const handleSave = async () => {
        if (!token || !editedUser) return;

        try {
            const response = await fetch(`http://localhost:3001/auth/${userId}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editedUser),
            });

            if (!response.ok) throw new Error("Failed to update user details");

            const updatedUser: User = await response.json();
            setUser(updatedUser);
            setIsEditing(false);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "User details updated successfully!",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update user details",
            });
        }
    };

    // Cancel editing and reset form
    const handleCancelClick = () => {
        setEditedUser(user);
        setIsEditing(false);
    };

    // Loading state
    if (loading) return <div>Loading...</div>;

    // Error state
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    // User data loaded successfully
    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <section className="text-center py-8">
                    <h1 className="text-4xl font-bold mb-4">Profile</h1>
                    <p className="text-lg text-gray-600">
                        Manage your profile information and keep it up to date.
                    </p>
                </section>

                <section className="max-w-2xl mx-auto">
                    <div className="card border border-base-300 shadow-sm p-6">
                        {/* Name */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={editedUser?.username || ""}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditing}
                            />
                        </div>

                        {/* Email */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={editedUser?.email || ""}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditing}
                            />
                        </div>

                        {/* Phone */}
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={editedUser?.phone || ""}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                readOnly={!isEditing}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            {isEditing ? (
                                <>
                                    <button onClick={handleCancelClick} className="btn btn-ghost">
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} className="btn btn-primary">
                                        Save
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(true)} className="btn btn-outline btn-primary">
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
