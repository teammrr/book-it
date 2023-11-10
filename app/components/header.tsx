import Link from "next/link";
import { Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import styles from "./header.module.css";
import { motion, useScroll, useTransform } from "framer-motion";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    ["0%", "0%", "-100%"]
  );

  return (
    <>
      <motion.header
        style={{
          position: "sticky",
          top: 0,
          y: headerY,
        }}
      >
        {!session && (
          <>
            <div className="absolute right-4 mt-2 w-42 origin-top-right">
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </div>
          </>
        )}
        <Disclosure as="nav" className="bg-gray-100 shadow-lg">
          {({ open }) => (
            <>
              <div className="mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-[#002D74] hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <a href="/">
                        <Image
                          className="h-8 w-auto"
                          width={40}
                          height={40}
                          src="/img/logo512.png"
                          alt="Book It"
                        />
                      </a>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex flex-row space-x-4">
                        <Link
                          href="/"
                          className="text-[#002D74]  hover:text-[#393e46] transition ease-in-out duration-200 block rounded-md px-3 py-2 text-base font-medium"
                        >
                          Home
                        </Link>
                        <Link
                          href="/reservations"
                          className="text-[#002D74]  hover:text-[#393e46] transition ease-in-out duration-200 block rounded-md px-3 py-2 text-base font-medium"
                        >
                          My Reservation
                        </Link>
                        <Link
                          href="/history"
                          className="text-[#002D74]  hover:text-[#393e46] transition ease-in-out duration-200 block rounded-md px-3 py-2 text-base font-medium"
                        >
                          History
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <Image
                            width={30}
                            height={30}
                            src={
                              session?.user?.image
                                ? session.user.image
                                : "/img/logo-black.png"
                            }
                            alt="User Profile"
                            className="rounded-full"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="me"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-[#002D74]"
                                )}
                              >
                                {session?.user?.name || "Not Signed In"}
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={() => signOut()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-[#002D74]"
                                )}
                              >
                                Sign Out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <Link
                    href="/"
                    className="text-[#002D74]  hover:text-[#393e46] transition ease-in-out duration-200 block rounded-md px-3 py-2 text-base font-medium"
                  >
                    Home
                  </Link>
                  <hr className=" h-0.5 border-t-2 bg-zinc-100 opacity-100 " />
                  <Link
                    href="/reservations"
                    className="text-[#002D74]  hover:text-[#393e46] transition ease-in-out duration-200 block rounded-md px-3 py-2 text-base font-medium"
                  >
                    My Reservation
                  </Link>
                  <hr className=" h-0.5 border-t-2 bg-zinc-100 opacity-100 " />
                  <Link
                    href="/history"
                    className="text-[#002D74]  hover:text-[#393e46] transition ease-in-out duration-200 block rounded-md px-3 py-2 text-base font-medium"
                  >
                    History
                  </Link>
                  <hr className=" h-0.5 border-t-2 bg-zinc-100 opacity-100 " />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </motion.header>
    </>
  );
}
