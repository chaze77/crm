import React, { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import Authorization from '@/pages/Authorization'; // Импортируем компонент логина

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    // Если пользователь не авторизован, показываем страницу логина
    return <Authorization />;
  }

  // Если пользователь авторизован, рендерим защищённый контент
  return <>{children}</>;
};

export default RequireAuth;
