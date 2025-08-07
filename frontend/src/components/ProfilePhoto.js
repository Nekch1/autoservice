import React, { useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/img/default-avatar.png';
import './ProfilePhoto.css'

const ProfilePhoto = () => {
  const { user, uploadProfilePhoto, deleteProfilePhoto } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChoosePhoto = () => {
    fileInputRef.current.click();
    setIsMenuOpen(false);
  };

  const handlePhotoChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsLoading(true);
      const file = e.target.files[0];
      
      try {
        await uploadProfilePhoto(user.id, file);
      } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeletePhoto = async () => {
    setIsLoading(true);
    try {
      await deleteProfilePhoto(user.id);
    } catch (error) {
      console.error('Ошибка при удалении фото:', error);
    } finally {
      setIsLoading(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="profile-photo-container">
      <div className="profile-photo" onClick={handlePhotoClick}>
        {isLoading ? (
          <div className="photo-loading">Загрузка...</div>
        ) : (
          <img 
            src={user.photo ? `http://localhost:5000${user.photo}` : defaultAvatar} 
            alt="Фото профиля" 
            className="profile-avatar"
          />
        )}
      </div>
      <div className="photo-menu">
          <div className="photo-menu-item" onClick={handleChoosePhoto}>
            Выбрать фото
          </div>
          {user.photo && (
            <div className="photo-menu-item" onClick={handleDeletePhoto}>
              Удалить фото
            </div>
          )}
        </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handlePhotoChange} 
        accept="image/jpeg, image/png, image/jpg, image/gif"
      />
      
    </div>
  );
};

export default ProfilePhoto;



// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import defaultAvatar from '../assets/img/default-avatar.png';
// import './ProfilePhoto.css';

// const ProfilePhoto = () => {
//   const { user, uploadProfilePhoto, deleteProfilePhoto } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const fileInputRef = useRef(null);
//   const menuRef = useRef(null);
//   const buttonRef = useRef(null);

//   // Закрыть меню при клике вне его
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setIsMenuOpen(false);
//       }
//     }
//     function handleEsc(event) {
//       if (event.key === 'Escape') {
//         setIsMenuOpen(false);
//         buttonRef.current?.focus();
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleEsc);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleEsc);
//     };
//   }, []);

//   const handlePhotoClick = () => {
//     setIsMenuOpen(prev => !prev);
//   };

//   const handleChoosePhoto = () => {
//     fileInputRef.current.click();
//     setIsMenuOpen(false);
//   };

//   const handlePhotoChange = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setIsLoading(true);
//       const file = e.target.files[0];
//       try {
//         await uploadProfilePhoto(user.id, file);
//       } catch (error) {
//         console.error('Ошибка при загрузке фото:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleDeletePhoto = async () => {
//     setIsLoading(true);
//     try {
//       await deleteProfilePhoto(user.id);
//     } catch (error) {
//       console.error('Ошибка при удалении фото:', error);
//     } finally {
//       setIsLoading(false);
//       setIsMenuOpen(false);
//       buttonRef.current?.focus();
//     }
//   };

//   return (
//     <div className="profile-photo-container">
//       {/* Кнопка для открытия меню с aria */}
//       <button
//         type="button"
//         className="profile-photo"
//         onClick={handlePhotoClick}
//         aria-haspopup="true"
//         aria-expanded={isMenuOpen}
//         aria-controls="photo-menu"
//         ref={buttonRef}
//       >
//         {isLoading ? (
//           <div className="photo-loading" aria-live="polite">Загрузка...</div>
//         ) : (
//           <img 
//             src={user.photo ? `http://localhost:5000${user.photo}` : defaultAvatar} 
//             alt="Фото профиля" 
//             className="profile-avatar"
//           />
//         )}
//       </button>

//       {isMenuOpen && (
//         <div 
//           id="photo-menu" 
//           className="photo-menu" 
//           role="menu"
//           ref={menuRef}
//           // tabIndex={-1}
//         >
//           <button 
//             type="button" 
//             className="photo-menu-item" 
//             onClick={handleChoosePhoto}
//             // role="menuitem"
//           >
//             Выбрать фото
//           </button>
//           {user.photo && (
//             <button 
//               type="button" 
//               className="photo-menu-item" 
//               onClick={handleDeletePhoto}
//               // role="menuitem"
//             >
//               Удалить фото
//             </button>
//           )}
//         </div>
//       )}

//       <input 
//         type="file" 
//         ref={fileInputRef} 
//         style={{ display: 'none' }} 
//         onChange={handlePhotoChange} 
//         accept="image/jpeg, image/png, image/jpg, image/gif"
//         aria-hidden="true"
//         // tabIndex={-1}
//         // aria-label='Выбрать фото профиля'
//       />
//     </div>
//   );
// };

// export default ProfilePhoto;
