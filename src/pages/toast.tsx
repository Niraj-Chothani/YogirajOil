import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  duration?: number; // milliseconds
};

const Toast = ({ message, duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-5 right-5 bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slideIn">
      {message}
    </div>
  );
};

export default Toast;
