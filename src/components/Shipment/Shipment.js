/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import styles from './Shipment.module.css';

const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loggedInUser] = useContext(UserContext);
  const onSubmit = (data) => {
    console.log('form submitted', data);
  };

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <form className={styles.shipForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={loggedInUser.name}
        {...register('name', { required: true })}
        placeholder="Your Name"
      />
      {errors.name && <span className={styles.error}>Name is required</span>}

      <input
        defaultValue={loggedInUser.email}
        {...register('email', { required: true })}
        placeholder="Your Email"
      />
      {errors.email && <span className={styles.error}>Email is required</span>}

      <input {...register('address', { required: true })} placeholder="Your Address" />
      {errors.address && <span className={styles.error}>Address is required</span>}

      <input {...register('phone', { required: true })} placeholder="Your Phone" />
      {errors.phone && <span className={styles.error}>Phone is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
