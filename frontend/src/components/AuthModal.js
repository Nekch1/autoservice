// import React, { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import closeIcon from '../assets/img/close-menu.svg';
// import EyeOpen from '../assets/img/password_open_eye.png';
// import EyeClose from '../assets/img/password_close_eye.png';
// // import './AuthModal.css'

// const AuthModal = ({ isOpen, onClose }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     surname: '',
//     phone: '',
//     email: '',
//     password: ''
//   });
//   const { login, register, error } = useContext(AuthContext);

//   useEffect(() => {
//     if (isOpen) {
//       setTimeout(() => setIsVisible(true), 10);
//     } else {
//       setIsVisible(false);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const togglePassword = () => {
//     setShowPassword(prev => !prev);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     let success;
//     if (isLogin) {
//       success = await login({ email: formData.email, password: formData.password });
//     } else {
//       success = await register(formData);
//     }
    
//     if (success) {
//       onClose();
//     }
//   };

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   return (
//     <>
//       <div className={`modal-overlay ${isVisible ? "show" : ""}`} onClick={onClose}></div>

//       <div className={`modal fade d-block ${isVisible ? "show" : ""}`} tabIndex="-1">
//         <div className="modal-dialog">
//           <div className="modal-content">

//             <div className="modal-header">
//               <h5 className="modal-title">{isLogin ? 'Вход' : 'Регистрация'}</h5>
//               <button type="button" className="btn-close" onClick={onClose} aria-label="Закрыть">
//                 <img src={closeIcon} alt="Закрыть" />
//               </button>
//             </div>

//             <div className="modal-body">
//               {error && <div className="alert alert-danger">{error}</div>}
              
//               <form onSubmit={handleSubmit}>
//                 {!isLogin && (
//                   <>
//                     <div className="mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="name"
//                         placeholder="Имя"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required={!isLogin}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="surname"
//                         placeholder="Фамилия"
//                         value={formData.surname}
//                         onChange={handleChange}
//                         required={!isLogin}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <input
//                         type="tel"
//                         className="form-control"
//                         name="phone"
//                         placeholder="Телефон"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         required={!isLogin}
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3" style={{ position: 'relative' }}>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     className="form-control"
//                     name="password"
//                     placeholder="Пароль"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     style={{ paddingRight: '40px' }}
//                   />
//                   <img
//                     onClick={togglePassword}
//                     src={showPassword ? EyeClose : EyeOpen}
//                     alt="Показать пароль"
//                     style={{
//                       position: 'absolute',
//                       right: '10px',
//                       top: '50%',
//                       transform: 'translateY(-50%)',
//                       cursor: 'pointer',
//                       width: '20px'
//                     }}
//                   />
//                 </div>

//                 <button type="submit" className="btn bg-primary text-white w-100">
//                   {isLogin ? 'Войти' : 'Зарегистрироваться'}
//                 </button>
//               </form>
//             </div>

//             <div className="modal-footer justify-content-center">
//               {isLogin ? (
//                 <p>Нет аккаунта? <button className="btn btn-link p-0" onClick={toggleForm}>Зарегистрироваться</button></p>
//               ) : (
//                 <p>Уже есть аккаунт? <button className="btn btn-link p-0" onClick={toggleForm}>Войти</button></p>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthModal;



import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import closeIcon from '../assets/img/close-menu.svg';
import EyeOpen from '../assets/img/password_open_eye.png';
import EyeClose from '../assets/img/password_close_eye.png';

const AuthModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: ''
  });
  const { login, register, error } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let success;
    if (isLogin) {
      success = await login({ email: formData.email, password: formData.password });
    } else {
      success = await register(formData);
    }
    
    if (success) {
      onClose();
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className={`modal-overlay ${isVisible ? "show" : ""}`} onClick={onClose} aria-hidden="true"></div>

      <div
        className={`modal fade d-block ${isVisible ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="auth-modal-title">{isLogin ? 'Вход' : 'Регистрация'}</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Закрыть">
                <img src={closeIcon} alt="" aria-hidden="true" />
              </button>
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Имя"
                        value={formData.name}
                        onChange={handleChange}
                        required={!isLogin}
                        aria-label="Имя"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="surname"
                        placeholder="Фамилия"
                        value={formData.surname}
                        onChange={handleChange}
                        required={!isLogin}
                        aria-label="Фамилия"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={handleChange}
                        required={!isLogin}
                        aria-label="Телефон"
                      />
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-label="Email"
                  />
                </div>

                <div className="mb-3" style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    aria-label="Пароль"
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                    aria-pressed={showPassword}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: 0
                    }}
                  >
                    <img
                      src={showPassword ? EyeClose : EyeOpen}
                      alt=""
                      aria-hidden="true"
                      style={{ width: '20px' }}
                    />
                  </button>
                </div>

                <button type="submit" className="btn bg-primary text-white w-100">
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
              </form>
            </div>

            <div className="modal-footer justify-content-center">
              {isLogin ? (
                <p>Нет аккаунта? <button type="button" className="btn btn-link p-0" onClick={toggleForm}>Зарегистрироваться</button></p>
              ) : (
                <p>Уже есть аккаунт? <button type="button" className="btn btn-link p-0" onClick={toggleForm}>Войти</button></p>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
