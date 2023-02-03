import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./atoms/button";

export default function MyDialog({ isOpen, setIsOpen, onClick }: any) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 overflow-y-auto bg-opacity-30 bg-black">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-48 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="h-full flex flex-col justify-around">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Are you sure ?
                      </Dialog.Title>
                      <Dialog.Description>
                        This will permanently delete the user account
                      </Dialog.Description>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        size="small"
                        variant="danger"
                        onClick={() => {
                          onClick();
                          setIsOpen(false);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
