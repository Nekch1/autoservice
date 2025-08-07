// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const { user, loading } = useContext(AuthContext);

//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [updatingId, setUpdatingId] = useState(null);
//   const [statusMap, setStatusMap] = useState({});
//   const [priceMap, setPriceMap] = useState({});
//   const [error, setError] = useState(null);
//   const [userError, setUserError] = useState(null);

//   const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

//   useEffect(() => {
//     if (user?.role === 'admin') {
//       fetchOrders();
//       fetchUsers();
//     }
//   }, [user]);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API}/orders`, { withCredentials: true });
//       setOrders(res.data.data || res.data.rows || []);
//     } catch (err) {
//       console.error('Ошибка загрузки заказов:', err);
//       setError('Ошибка при получении заказов');
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${API}/users`, { withCredentials: true });
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Ошибка загрузки пользователей:', err);
//       setUserError('Не удалось загрузить пользователей');
//     }
//   };

//   const handleUpdate = async (orderId) => {
//     try {
//       const status = statusMap[orderId];
//       const price = priceMap[orderId];

//       await axios.put(`${API}/orders/${orderId}`, {
//         status,
//         price: price !== '' ? parseFloat(price) : null
//       }, { withCredentials: true });

//       setUpdatingId(null);
//       fetchOrders();
//     } catch (err) {
//       console.error('Ошибка обновления заказа:', err);
//       setError('Не удалось обновить заказ');
//     }
//   };

//   const handleDelete = async (orderId) => {
//     if (!window.confirm('Удалить этот заказ?')) return;
//     try {
//       await axios.delete(`${API}/orders/${orderId}`, { withCredentials: true });
//       fetchOrders();
//     } catch (err) {
//       console.error('Ошибка удаления:', err);
//       setError('Не удалось удалить заказ');
//     }
//   };

//   const handleBlockUser = async (userId) => {
//     if (!window.confirm('Заблокировать этого пользователя?')) return;
//     try {
//       await axios.put(`${API}/users/${userId}/block`, {}, { withCredentials: true });
//       fetchUsers();
//     } catch (err) {
//       console.error('Ошибка блокировки:', err);
//       setUserError('Не удалось заблокировать пользователя');
//     }
//   };

//   if (loading) {
//     return <div className="container mt-5">Загрузка...</div>;
//   }

//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className="container-fluid d-flex flex-column min-vh-100 pt-5">
//       <div className="container mb-4 flex-grow-1">
//         <h2 className="text-center mt-5 mb-4" style={{ wordBreak: 'break-word', fontSize: '1.75rem' }}>Админ-панель: управление заказами</h2>

//         {error && <div className="alert alert-danger">{error}</div>}

//         {orders.length === 0 ? (
//           <div className="alert alert-info">Заказов пока нет.</div>
//         ) : (
//           <div className="shadow-sm">
//             <div className="card-body table-responsive">
//               <table className="table table-bordered table-hover text-center align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Пользователь</th>
//                     <th>Авто</th>
//                     <th>Услуги</th>
//                     <th>Дата</th>
//                     <th>Статус</th>
//                     <th>Цена (₽)</th>
//                     <th colSpan={2}>Действия</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map(order => (
//                     <tr key={order.id}>
//                       <td>{order.User?.name} {order.User?.surname}</td>
//                       <td>{order.Car?.mark} {order.Car?.model}</td>
//                       <td>{order.Service?.map(s => s.name).join(', ')}</td>
//                       <td>{new Date(order.order_date).toLocaleString()}</td>
//                       <td>
//                         <select
//                           className="form-select form-select-sm"
//                           value={statusMap[order.id] || order.status}
//                           onChange={(e) =>
//                             setStatusMap({ ...statusMap, [order.id]: e.target.value })
//                           }
//                         >
//                           <option value="ожидание">Ожидание</option>
//                           <option value="в процессе">В процессе</option>
//                           <option value="завершён">Завершён</option>
//                           <option value="отменён">Отменён</option>
//                         </select>
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           className="form-control form-control-sm"
//                           placeholder="₽"
//                           value={priceMap[order.id] ?? (order.price || '')}
//                           onChange={(e) =>
//                             setPriceMap({ ...priceMap, [order.id]: e.target.value })
//                           }
//                         />
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-success btn-sm"
//                           onClick={() => handleUpdate(order.id)}
//                           disabled={updatingId === order.id}
//                         >
//                           Сохранить
//                         </button>
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-outline-danger btn-sm"
//                           onClick={() => handleDelete(order.id)}
//                         >
//                           Удалить
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Управление пользователями */}
//         <div className="container mt-5">
//           <h2 className="text-center mb-4">Управление пользователями</h2>
//           {userError && <div className="alert alert-danger">{userError}</div>}

//           {users.length === 0 ? (
//             <div className="alert alert-info">Пользователей пока нет.</div>
//           ) : (
//             <table className="table table-bordered table-hover text-center align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>Имя</th>
//                   <th>Email</th>
//                   <th>Роль</th>
//                   {/* <th>Заблокирован</th> */}
//                   <th>Действие</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map(u => (
//                   <tr key={u.id}>
//                     <td>{u.name} {u.surname}</td>
//                     <td>{u.email}</td>
//                     <td>{u.role}</td>
//                     {/* <td>{u.isBlocked ? 'Да' : 'Нет'}</td> */}
//                     <td>
//                       {!u.isBlocked ? (
//                         <button
//                           className="btn btn-outline-danger btn-sm"
//                           onClick={() => handleBlockUser(u.id)}
//                         >
//                           Заблокировать
//                         </button>
//                       ) : (
//                         <span className="text-muted">Уже заблокирован</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const [priceMap, setPriceMap] = useState({});
  const [error, setError] = useState(null);
  const [userError, setUserError] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // NEW

  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersTotalPages, setOrdersTotalPages] = useState(1);

  // Пагинация пользователей
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotalPages, setUsersTotalPages] = useState(1);

  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOrders();  
      fetchUsers();
    }
  }, [user]);

  const fetchOrders = async (page = ordersPage) => {
    try {
      const res = await axios.get(`${API}/orders?page=${page}&limit=15`, { withCredentials: true });
      setOrders(res.data.data);
      setOrdersTotalPages(res.data.pages);
      setOrdersPage(res.data.currentPage);
    } catch (err) {
      console.error('Ошибка загрузки заказов:', err);
      setError('Ошибка при получении заказов');
    }
  };

  const fetchUsers = async (page = usersPage) => {
    try {
      const res = await axios.get(`${API}/users?page=${page}&limit=15`, { withCredentials: true });
      setUsers(res.data.data);
      setUsersTotalPages(res.data.pages);
      setUsersPage(res.data.currentPage);
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err);
      setUserError('Не удалось загрузить пользователей');
    }
  }

  const handleUpdate = async (orderId) => {
    try {
      const status = statusMap[orderId];
      const price = priceMap[orderId];

      await axios.put(`${API}/orders/${orderId}`, {
        status,
        price: price !== '' ? parseFloat(price) : null
      }, { withCredentials: true });

      setUpdatingId(null);
      fetchOrders();
    } catch (err) {
      console.error('Ошибка обновления заказа:', err);
      setError('Не удалось обновить заказ');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Удалить этот заказ?')) return;
    try {
      await axios.delete(`${API}/orders/${orderId}`, { withCredentials: true });
      fetchOrders();
    } catch (err) {
      console.error('Ошибка удаления:', err);
      setError('Не удалось удалить заказ');
    }
  };

  const handleBlockUser = async (userId) => {
    if (!window.confirm('Заблокировать этого пользователя?')) return;
    try {
      await axios.put(`${API}/users/${userId}/block`, {}, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      console.error('Ошибка блокировки:', err);
      setUserError('Не удалось заблокировать пользователя');
    }
  };

  if (loading) return <div className="container mt-5">Загрузка...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 pt-5">
      <div className="container mb-4 flex-grow-1">
        <h2 className="title text-center text-primary" style={{marginTop:'40px', textTransform:'uppercase'}}>
          Админ-панель
        </h2>
        {/* Tabs */}
        <ul className="nav nav-tabs mb-4 admin-nav">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Заказы
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Пользователи
            </button>
          </li>
        </ul>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            {error && <div className="alert alert-danger">{error}</div>}

            {orders.length === 0 ? (
              <div className="alert alert-info">Заказов пока нет.</div>
            ) : (
              <div className="shadow-sm">
                <div className="card-body table-responsive">
                  <table className="table table-bordered table-hover text-center align-middle">
                    <thead className="table-light">
                      <tr style={{fontSize:'16px'}}>
                        <th>Пользователь</th>
                        <th>Авто</th>
                        <th>Услуги</th>
                        <th>Дата</th>
                        <th style={{width:'200px'}}>Статус</th>
                        <th>Цена (₽)</th>
                        <th colSpan={2}>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.User?.name} {order.User?.surname}</td>
                          <td>{order.Car?.mark} {order.Car?.model}</td>
                          <td>{order.Service?.map(s => s.name).join(', ')}</td>
                          <td>{new Date(order.order_date).toLocaleString()}</td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={statusMap[order.id] || order.status}
                              onChange={(e) =>
                                setStatusMap({ ...statusMap, [order.id]: e.target.value })
                              }
                            >
                              <option value="ожидание">Ожидание</option>
                              <option value="в процессе">В процессе</option>
                              <option value="завершён">Завершён</option>
                              <option value="отменён">Отменён</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              placeholder="₽"
                              value={priceMap[order.id] ?? (order.price || '')}
                              onChange={(e) =>
                                setPriceMap({ ...priceMap, [order.id]: e.target.value })
                              }
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleUpdate(order.id)}
                              disabled={updatingId === order.id}
                            >
                              Сохранить
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-delete"
                              onClick={() => handleDelete(order.id)}
                            >
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                    <div className="pagination d-flex justify-content-center mt-4">
                      <button className="btn me-2 bg-primary text-white" disabled={ordersPage === 1} onClick={() => fetchOrders(ordersPage - 1)}>Назад</button>
                      <span className='d-flex align-items-center mx-2'>{ordersPage} / {ordersTotalPages}</span>
                      <button className="btn ms-2 bg-primary text-white" disabled={ordersPage === ordersTotalPages} onClick={() => fetchOrders(ordersPage + 1)}>Вперёд</button>
                    </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <>
            {userError && <div className="alert alert-danger">{userError}</div>}

            {users.length === 0 ? (
              <div className="alert alert-info">Пользователей пока нет.</div>
            ) : (
              <>
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Имя</th>
                      <th>Email</th>
                      <th>Роль</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.name} {u.surname}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                          {!u.isBlocked ? (
                            <button
                              className="btn btn-delete"
                              onClick={() => handleBlockUser(u.id)}
                            >
                              Заблокировать
                            </button>
                          ) : (
                            <span className="text-muted">Уже заблокирован</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  <div className="pagination d-flex justify-content-center mt-4">
                    <button className="btn me-2 bg-primary text-white" disabled={usersPage === 1} onClick={() => fetchUsers(usersPage - 1)}>Назад</button>
                    <span className='d-flex align-items-center mx-2'>{usersPage} / {usersTotalPages}</span>
                    <button className="btn ms-2 bg-primary text-white" disabled={usersPage === usersTotalPages} onClick={() => fetchUsers(usersPage + 1)}>Вперёд</button>
                  </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
