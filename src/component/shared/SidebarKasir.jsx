import React from "react";
import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "./navbar.css";
// import exampleImage from "./logokasir.png";

const TABS_LINK = [
  {
    key: 'pemesanan',
    label: 'Pemesanan',
    path: '/pemesanan',
  },

  {
    key: 'riwayat',
    label: 'Riwayat',
    path: '/riwayat',
  },
]

const linkClass = 'inline-block px-4 py-4 rounded-lg hover:bg-green-600'

export default function TabsKasir() {
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
    window.location.reload()
  }

  const { pathname } = useLocation()

  return (
    <div class="fixed flex h-full">
      <nav class="bg-gray-900 w-40  justify-between flex flex-col ">
        <div class="mt-10 mb-10">
          <a href="/pemesanan">
            <img
              src="https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg?t=st=1696953203~exp=1696953803~hmac=b48abd9e48315df0a0b013603e7819fb8e402c0ade6b7bf76313f3f9ca0c76f1"
              class="rounded-full w-20 h-20 mb-3 mx-auto"
            />
          </a>
          <div class="mt-10">
            <ul>
              <li class="mb-6">
                <a href="pemesanan" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white w-24 h-24 ml-2 pt-10">
                  <svg viewBox="0 0 1024 1024" fill="#ffffff" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M300 462.4h424.8v48H300v-48zM300 673.6H560v48H300v-48z" fill=""></path>
                      <path d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-18.4-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 29.6-20 12-4.8 24-7.2 36.8-7.2h92.8v47.2H205.6c-25.6 0-47.2 20.8-47.2 47.2v637.6c0 25.6 20.8 47.2 47.2 47.2h612c25.6 0 47.2-20.8 47.2-47.2V250.4c0-25.6-20.8-47.2-47.2-47.2H725.6v-47.2h92.8c12.8 0 24.8 2.4 36.8 7.2 11.2 4.8 21.6 11.2 29.6 20 8.8 8.8 15.2 18.4 20 29.6 4.8 12 7.2 24 7.2 36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z" fill=""></path>
                      <path d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6z m-423.2-47.2h376.8V144c0-6.4-5.6-12-12-12H595.2l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16H335.2c-6.4 0-12 5.6-12 12v106.4z" fill=""></path>
                    </g>
                  </svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">order</span>
                </a>
              </li>
              
              <li class="mb-7">
                  <a href="riwayat" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white w-44 h-44 ml-2 pb-80">
                  <svg class="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-red-500 " viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M10.5.5C7 .5 3.9 2.4 2.3 5.3L0 3v6.5h6.5L3.7 6.7C5 4.2 7.5 2.5 10.5 2.5c4.1 0 7.5 3.4 7.5 7.5s-3.4 7.5-7.5 7.5c-3.3 0-6-2.1-7.1-5H1.3c1.1 4 4.8 7 9.2 7 5.3 0 9.5-4.3 9.5-9.5S15.7.5 10.5.5ZM9 5.5v5.1l4.7 2.8.8-1.3-4-2.4V5.5H9Z" fill="#ffffff" opacity=".9" fill-rule="evenodd" class="fill-000000"></path></svg>
                  <span className="flex-1 ml-3 whitespace-nowrap">riwayat</span>
                </a>
              </li>
              {/* <li class="mb-6">
                        <a href="#">
                          <span>
                            <svg
                              class="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                                  4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                                  9v2h-4v-2h4m2-2h-8v6h8v-6z"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span>
                            <svg
                              class="fill-current h-5 w-5 text-gray-300 mx-auto hover:text-green-500"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22.775 8C22.9242 8.65461 23 9.32542 23 10H14V1C14.6746 1 15.3454 1.07584 16 1.22504C16.4923 1.33724 16.9754 1.49094 17.4442 1.68508C18.5361 2.13738 19.5282 2.80031 20.364 3.63604C21.1997 4.47177 21.8626 5.46392 22.3149 6.55585C22.5091 7.02455 22.6628 7.5077 22.775 8ZM20.7082 8C20.6397 7.77018 20.5593 7.54361 20.4672 7.32122C20.1154 6.47194 19.5998 5.70026 18.9497 5.05025C18.2997 4.40024 17.5281 3.88463 16.6788 3.53284C16.4564 3.44073 16.2298 3.36031 16 3.2918V8H20.7082Z"
                                fill="currentColor"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1 14C1 9.02944 5.02944 5 10 5C10.6746 5 11.3454 5.07584 12 5.22504V12H18.775C18.9242 12.6546 19 13.3254 19 14C19 18.9706 14.9706 23 10 23C5.02944 23 1 18.9706 1 14ZM16.8035 14H10V7.19648C6.24252 7.19648 3.19648 10.2425 3.19648 14C3.19648 17.7575 6.24252 20.8035 10 20.8035C13.7575 20.8035 16.8035 17.7575 16.8035 14Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </a>
                      </li> */}
            </ul>
          </div>
        </div>
        <div class="mb-4">
          <a href="#">
            <span onClick={handleLogout}>
              <svg
                class="fill-current h-7 w-7 text-gray-300 mx-auto hover:text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                  fill="currentColor"
                />
                <path
                  d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </a>
        </div>
      </nav>
      {/* <div class="px-16 py-4 text-gray-700 bg-gray-200 h-screen w-screen">
              </div> */}
    </div>
  )
}

function TabsLink({ item, pathname }) {
  return (
    <Link to={item.path} className={classNames(pathname === item.path ? 'inline-block mx-1 px-4 py-3 text-white bg-green-900 rounded-lg hover:bg-green-900' : '', linkClass)}>
      {item.label}
    </Link>
  )
}
