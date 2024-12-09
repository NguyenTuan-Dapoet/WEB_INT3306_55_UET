import React, { createContext, useState, useContext } from 'react';

const RegisterContext = createContext();

export const useRegister = () => {
  return useContext(RegisterContext);
};

export const RegisterProvider = ({ children }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [data, setData] = useState(null); // Thêm state để lưu dữ liệu trả về từ API

  const register = async (fullName, phoneNumber, username, password) => {
    setStatus('loading');
    setError('');
    try {
      // Thực hiện gửi yêu cầu đăng ký
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify({
          username,  // trường username
          password,  // trường password
          fullName,  // trường fullName
          phoneNumber, // trường phoneNumber
        }),
      });

      if (!response.ok) {
        throw new Error('Đăng ký thất bại. Kiểm tra lại thông tin.');
      }

      // Lấy dữ liệu trả về từ API (dưới dạng chuỗi)
      const data = await response.json();
      setData(data);  // Lưu dữ liệu trả về vào state
      setStatus('succeeded');
      return data;  // Trả về dữ liệu
    } catch (err) {
      setError('Có lỗi khi đăng ký: ' + err.message);
      setStatus('failed');
    } 
  };

  return (
    <RegisterContext.Provider value={{ register, status, error, data }}>
      {children}
    </RegisterContext.Provider>
  );
};