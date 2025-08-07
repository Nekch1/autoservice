// import React, { useEffect, useState } from 'react';
// import axios from '../api'; // если у тебя есть общий axios instance
// // import './OrderHistoryPage.css';

// const OrderHistoryPage = ({ userId }) => {
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // const response = await axios.get(`/orders?userId=${userId}&page=${page}`);
//         const response = await axios.get(`http://localhost:5000/orders?userId=${userId}&page=${page}`);
//         setOrders(response.data.data);
//         setPages(response.data.pages);
//         console.log(response.data)
//       } catch (err) {
//         console.error('Ошибка загрузки заказов', err);
//       }
//     };
//     fetchOrders();
//   }, [userId, page]);

//   return (
//     <section className='history-section'>
//       <div className='container'>
//         <div className='profile-block'>
//           <div className="order-history">
//             <div className='title'>Мои заказы</div>
//             {orders.length === 0 ? (
//               <p>У вас пока нет заказов.</p>
//             ) : (
//               <>
//                 {/* <table className="order-table" >
//                   <thead>
//                     <tr>
//                       <th>Дата</th>
//                       <th>Время</th>
//                       <th>Авто</th>
//                       <th>Услуги</th>
//                       <th>Статус</th>
//                       <th>Цена</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order.id}>
//                         <td>{new Date(order.order_date).toLocaleDateString()}</td>
//                         <td>{order.order_time}</td>
//                         <td>{order.Car?.mark} {order.Car?.model}</td>
//                         <td>{order.Service.map(s => s.name).join(', ')}</td>
//                         <td>{order.status}</td>
//                         <td>{order.price ? `${order.price} ₽` : '—'}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table> */}
//                 <div className="orders-list">
//                   {orders.map((order) => (
//                     <div key={order.id} className="order-card">
//                       <div style={{"fontSize":"30px", "color":"#0059C2"}}> {order.Service.map(s => s.name).join(', ')}</div>
//                       <div><strong>Дата:</strong> {new Date(order.order_date).toLocaleDateString()}</div>
//                       <div><strong>Время:</strong> {order.order_time}</div>
//                       <div><strong>Автомобиль:</strong> {order.Car?.mark} {order.Car?.model}</div>
//                       {/* <div><strong>Статус:</strong> {order.status}</div> */}
//                       {/* <div><strong>Цена:</strong> {order.price ? `${order.price} ₽` : '—'}</div> */}
//                     </div>
//                   ))}
//                 </div>


//                 <div className="pagination">
//                   {Array.from({ length: pages }, (_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => setPage(i + 1)}
//                       className={page === i + 1 ? 'active' : ''}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OrderHistoryPage;







import React, { useEffect, useState } from 'react';
import axios from '../api'; // если у тебя есть общий axios instance
// import './OrderHistoryPage.css';

const OrderHistoryPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders`, {
          params: { userId, page: currentPage, limit: 5 }
        });
        setOrders(response.data.data);
        setTotalPages(response.data.pages);
      } catch (err) {
        console.error('Ошибка загрузки заказов', err);
      }
    };
    fetchOrders();
  }, [userId, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section className='history-section'>
      <div className='container'>
        <div className='profile-block'>
          <div className="order-history">
            <div className='title'>Мои заказы</div>
            {orders.length === 0 ? (
              <p>У вас пока нет заказов.</p>
            ) : (
              <>
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div style={{ fontSize: "30px", color: "#0059C2" }}>
                        {order.Service.map(s => s.name).join(', ')}
                      </div>
                      <div><strong>Дата:</strong> {new Date(order.order_date).toLocaleDateString()}</div>
                      <div><strong>Время:</strong> {order.order_time}</div>
                      <div><strong>Автомобиль:</strong> {order.Car?.mark} {order.Car?.model}</div>
                       <div><strong>Статус:</strong> {order.status}</div>
                       <div><strong>Цена:</strong> {order.price ? `${order.price} ₽` : '—'}</div>
                    </div>
                  ))}
                </div>

                <div className="pagination d-flex justify-content-center mt-4">
                  <button className='btn me-2 bg-primary text-white' onClick={handlePrevPage} disabled={currentPage === 1}>
                    Назад
                  </button>
                  <span className='d-flex align-items-center mx-2'>{currentPage} / {totalPages}</span>
                  <button className='btn ms-2 bg-primary text-white' onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Вперед
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderHistoryPage;

