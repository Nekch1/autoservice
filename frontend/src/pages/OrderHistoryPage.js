import React, { useEffect, useState } from 'react';
import closeIcon from '../assets/img/close-menu.svg';
import axios from '../api';

const OrderHistoryPage = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // состояние для модалки
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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

  useEffect(() => {
    fetchOrders();
  }, [userId, currentPage]);

  const cancelOrder = async () => {
    try {
      await axios.put(`http://localhost:5000/orders/${selectedOrderId}/cancel`);
      fetchOrders(); 
      setShowModal(false); // закрываем модалку
      setSelectedOrderId(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Ошибка отмены заказа');
    }
  };

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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'завершён':
        return { color: 'green', textTransform:'capitalize' };
      case 'отменён':
        return { color: 'red', textTransform:'capitalize'};
      case 'ожидание':
        return { color: 'gray', textTransform:'capitalize' };
      case 'в процессе':
        return { color: '#333',textTransform:'capitalize' };
      default:
        return {};
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
                    <div key={order.id} className="order-card row">
                        <div className='order-title'>
                          {order.Service.map(s => s.name).join(', ')}
                        </div>
                      <div className='col-8'>

                        <div className='order-description'><strong>Дата:</strong> {new Date(order.order_date).toLocaleDateString()}</div>
                        <div className='order-description'><strong>Время:</strong> {order.order_time}</div>
                        <div className='order-description'><strong>Автомобиль:</strong> {order.Car?.mark} {order.Car?.model}</div>
                        <div className='order-description'><strong>Статус:</strong>  <span style={getStatusStyle(order.status)}>{order.status}</span></div>
                        <div className='order-description'><strong>Цена:</strong> {order.price ? `${order.price} ₽` : 'Не указана'}</div>
                      </div>

                      <div className='col-4 edit-block'>
                        {order.status !== 'отменён' && order.status !== 'завершён' && (
                          <button 
                            className="btn btn-delete mt-2"
                            onClick={() => {
                              setSelectedOrderId(order.id);
                              setShowModal(true);
                            }}
                          >
                            Отменить запись
                          </button>
                        )}
                      </div>
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

      {/* Модалка подтверждения */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Подтверждение</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}>
                  <img src={closeIcon} alt="Закрыть" />
                </button>
              </div>
              <div className="modal-body">
                <p>Вы уверены, что хотите отменить запись?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Нет</button>
                <button className="btn btn-delete" onClick={cancelOrder}>Отменить</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderHistoryPage;
