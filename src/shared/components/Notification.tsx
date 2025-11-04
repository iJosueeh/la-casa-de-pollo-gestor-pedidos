import React from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface NotificationProps {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ show, message, type, onClose }) => {
  const icon = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />,
    error: <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />,
    info: <InformationCircleIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />,
  }[type];

  const bgColor = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    info: 'bg-blue-50',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  }[type];

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={React.Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-x-full opacity-0 sm:translate-y-0 sm:translate-x-0"
          enterTo="translate-x-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-xl border ${bgColor} border-opacity-60`}>
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{icon}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className={`text-sm font-medium ${textColor}`}>{message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
