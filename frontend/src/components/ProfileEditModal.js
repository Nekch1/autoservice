import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import closeIcon from '../assets/img/close-menu.svg';
// import './ProfileEditModal.css';

const ProfileEditModal = ({ isOpen, onClose }) => {
  const { user, updateProfile, changePassword } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (user) {
        setProfileData({
          name: user.name || '',
          surname: user.surname || '',
          phone: user.phone || '',
          email: user.email || ''
        });
      }
      // Фокусируемся на модальном окне при открытии
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const result = await updateProfile(profileData);
    setMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    });

    if (result.success) {
      setTimeout(() => {
        setMessage({ text: '', type: '' });
        onClose();
      }, 2000);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({
        text: 'Новые пароли не совпадают',
        type: 'error'
      });
      return;
    }

    const result = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    setMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    });

    if (result.success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => {
        setMessage({ text: '', type: '' });
        onClose();
      }, 2000);
    }
  };

  // Чтобы переключать вкладки клавишами (TabIndex и role="tablist")
  const handleKeyDown = (e, tabName) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabName);
    }
  };

  return (
    <>
      <div
        className={`modal-overlay ${isVisible ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div
        className={`modal fade d-block ${isVisible ? 'show' : ''}`}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-edit-modal-title"
        ref={modalRef}
        onKeyDown={(e) => {
          // Закрытие по Escape
          if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
          }
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 id="profile-edit-modal-title" className="modal-title">
                Редактирование профиля
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Закрыть окно редактирования профиля"
              >
                <img src={closeIcon} alt="" aria-hidden="true" />
              </button>
            </div>

            <div className="modal-body">
              <div
                className="d-flex gap-2 mb-3"
                role="tablist"
                aria-label="Выбор вкладки редактирования профиля"
              >
                <button
                  role="tab"
                  aria-selected={activeTab === 'profile'}
                  tabIndex={activeTab === 'profile' ? 0 : -1}
                  className={`btn btn-edit ${activeTab === 'profile' ? 'text-decoration-underline text-primary' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  onKeyDown={(e) => handleKeyDown(e, 'profile')}
                  id="tab-profile"
                  aria-controls="tabpanel-profile"
                >
                  Личные данные
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'password'}
                  tabIndex={activeTab === 'password' ? 0 : -1}
                  className={`btn btn-edit ${activeTab === 'password' ? 'text-decoration-underline text-primary' : ''}`}
                  onClick={() => setActiveTab('password')}
                  onKeyDown={(e) => handleKeyDown(e, 'password')}
                  id="tab-password"
                  aria-controls="tabpanel-password"
                >
                  Изменить пароль
                </button>
              </div>

              {message.text && (
                <div
                  className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                  role={message.type === 'error' ? 'alert' : undefined}
                  aria-live="polite"
                >
                  {message.text}
                </div>
              )}

              {activeTab === 'profile' ? (
                <form
                  onSubmit={handleProfileSubmit}
                  role="tabpanel"
                  id="tabpanel-profile"
                  aria-labelledby="tab-profile"
                  tabIndex={0}
                >
                  <div className="mb-3">
                    <label htmlFor="name-input" className="visually-hidden">
                      Имя
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Имя"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="surname-input" className="visually-hidden">
                      Фамилия
                    </label>
                    <input
                      id="surname-input"
                      type="text"
                      className="form-control"
                      name="surname"
                      placeholder="Фамилия"
                      value={profileData.surname}
                      onChange={handleProfileChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone-input" className="visually-hidden">
                      Телефон
                    </label>
                    <input
                      id="phone-input"
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Телефон"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email-input" className="visually-hidden">
                      Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <button type="submit" className="btn bg-primary text-white w-100">
                    Сохранить изменения
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handlePasswordSubmit}
                  role="tabpanel"
                  id="tabpanel-password"
                  aria-labelledby="tab-password"
                  tabIndex={0}
                >
                  <div className="mb-3">
                    <label htmlFor="current-password-input" className="visually-hidden">
                      Текущий пароль
                    </label>
                    <input
                      id="current-password-input"
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      placeholder="Текущий пароль"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="new-password-input" className="visually-hidden">
                      Новый пароль
                    </label>
                    <input
                      id="new-password-input"
                      type="password"
                      className="form-control"
                      name="newPassword"
                      placeholder="Новый пароль"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                      aria-required="true"
                      aria-describedby="password-help"
                    />
                    <small id="password-help" className="form-text text-muted">
                      Минимум 6 символов.
                    </small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="confirm-password-input" className="visually-hidden">
                      Подтвердите новый пароль
                    </label>
                    <input
                      id="confirm-password-input"
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Подтвердите новый пароль"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                      aria-required="true"
                    />
                  </div>
                  <button type="submit" className="btn bg-primary text-white w-100">
                    Изменить пароль
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditModal;
