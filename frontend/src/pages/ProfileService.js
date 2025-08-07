import React, { useState, useContext } from "react";
import OrderHistoryPage from "./OrderHistoryPage";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import ProfilePhoto from "../components/ProfilePhoto";
import ProfileEditModal from '../components/ProfileEditModal';

const ProfileService = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }
    
    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <main>
            <section className="profile">
                <div className="container">
                    <div className="to-service">
                        <svg style={{transform:" rotate(-90deg)"}} width="15" height="15" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_2048_102" fill="white">
                                                    <path d="M7.07129 4L3.53575 0.464461L0.000212009 4L3.53575 7.53554L7.07129 4Z"/>
                                                    </mask>
                                                    <path d="M3.53575 0.464461L2.12154 -0.949752L3.53575 -2.36397L4.94996 -0.949752L3.53575 0.464461ZM5.65708 5.41421L2.12154 1.87868L4.94996 -0.949752L8.4855 2.58579L5.65708 5.41421ZM4.94996 1.87868L1.41443 5.41421L-1.414 2.58579L2.12154 -0.949752L4.94996 1.87868Z" fill="#2F2F2F" mask="url(#path-1-inside-1_2048_102)"/>
                                                    </svg>
                            <Link to="/profile">Назад</Link>
                    </div>
                    <div className="profile-block personal">                     
                        <div className="title">Мой профиль</div>
                        <div className="profile-info-container">
                            <div className="profile-details">
                                <div className="profile-name">{user.name} {user.surname}</div>
                                <div className="row">
                                    <div className="personal-data col-md-2">
                                        <div className="personal-data-name">Телефон: </div>
                                        <div className="personal-data-name">Почта: </div>
                                    </div>
                                    <div className="personal-data col-md-2">
                                        <div className="personal-data-value">{user.phone}</div>
                                        <div className="personal-data-value">{user.email}</div>
                                    </div>
                                </div>
                            </div>
                            <ProfilePhoto />
                        </div>
                        <div className="change-btn" style={{"marginTop":"47px"}} onClick={() => setIsEditModalOpen(true)}>Изменить</div>
                    </div>
                </div>
            </section>

            <OrderHistoryPage userId={user.id} />

            <ProfileEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        </main>
    );
};

export default ProfileService;
