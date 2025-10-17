import React from "react";

// Toast wrapper
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export const Toast: React.FC<any> = ({ children }) => <div>{children}</div>;
export const ToastTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="font-bold">{children}</div>;
export const ToastDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const ToastClose: React.FC = () => <button>×</button>;
export const ToastViewport: React.FC = () => <div className="fixed top-0 right-0 p-4 z-50"></div>;
