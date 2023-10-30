import styles from './order.module.css';
import OrderInfo from "../../components/order-info/order-info";

const Order = () => {

  return (
    <main className={styles.content}>
      <section aria-label='Информация о заказе' className={styles.section}>
        <OrderInfo />
      </section>
    </main>
  );
};

export default Order;
