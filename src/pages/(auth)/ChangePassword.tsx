import React, { useState } from 'react';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Gửi thông tin đổi mật khẩu đến server
    //     // Xử lý logic tại đây onSubmit={handleSubmit} 
    // };

    return (
        <div className="max-w-md mx-auto m-4 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-gray-700">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordForm;