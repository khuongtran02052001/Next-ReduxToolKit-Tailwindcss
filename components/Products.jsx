import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { albumSelector, getAlbum } from '../store/reducer/albumSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Fragment } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { XIcon } from '@heroicons/react/outline'
import { addToCart, cartSelector, removeCart }
    from '../store/reducer/cartSliece';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function Products() {
    const [product, setProduct] = useState([])
    const album = useSelector(albumSelector)
    const cartItem = useSelector(cartSelector)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const handleAdd = (person) => {
        dispatch(addToCart(person))
    }

    const sumTotal = (total, current) => {
        console.log(typeof (current))
        return total += current.price
    }

    const Remove = product => {
        dispatch(removeCart(product))
    }

    React.useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Products
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Sex
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Price
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {album.map((person) => (
                                        <tr key={person.email}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-20 w-20">
                                                        <LazyLoadImage effect='blur' className="h-20 w-20 rounded-full" src={person.image} alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-bold">{person.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Already
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">{person.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    <button onClick={() => { handleAdd(person); setOpen(true) }}>AddtoCart</button>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    <Transition.Root show={open} as={Fragment}>
                                        <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                                            <div className="absolute inset-0 overflow-hidden">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-in-out duration-500"
                                                    enterFrom="opacity-0"
                                                    enterTo="opacity-100"
                                                    leave="ease-in-out duration-500"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                </Transition.Child>

                                                <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                                                        enterFrom="translate-x-full"
                                                        enterTo="translate-x-0"
                                                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                                                        leaveFrom="translate-x-0"
                                                        leaveTo="translate-x-full"
                                                    >
                                                        <div className="w-screen max-w-md">
                                                            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                                                                <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                                                    <div className="flex items-start justify-between">
                                                                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                                        <div className="ml-3 h-7 flex items-center">
                                                                            <button
                                                                                type="button"
                                                                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                                                onClick={() => setOpen(false)}
                                                                            >
                                                                                <span className="sr-only">Close panel</span>
                                                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <div className="mt-8">
                                                                        <div className="flow-root">
                                                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                                                {cartItem.map((product) => (
                                                                                    <li key={product.id} className="py-6 flex">
                                                                                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                                                                            <LazyLoadImage
                                                                                                src={product.image}
                                                                                                alt={product.imageAlt}
                                                                                                className="w-full h-full object-center object-cover"
                                                                                            />
                                                                                        </div>

                                                                                        <div className="ml-4 flex-1 flex flex-col">
                                                                                            <div>
                                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                                    <h3>
                                                                                                        <a href={product.href}>{product.title}</a>
                                                                                                    </h3>
                                                                                                    <p className="ml-4">{product.price}</p>
                                                                                                </div>
                                                                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                                            </div>
                                                                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                                                                <p className="text-gray-500"> {product.category}</p>

                                                                                                <div className="flex">
                                                                                                    <button onClick={() => Remove(product)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                                                        Remove
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <p>Subtotal</p>
                                                                        <p>{cartItem.reduce(sumTotal, 0)}</p>
                                                                    </div>
                                                                    <p className="mt-0.5 text-sm text-gray-900">total products: {cartItem.length}</p>
                                                                    <div className="mt-6">
                                                                        <a
                                                                            href="#"
                                                                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                                                        >
                                                                            Checkout
                                                                        </a>
                                                                    </div>
                                                                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                                                        <p>
                                                                            or{' '}
                                                                            <button
                                                                                type="button"
                                                                                className="text-indigo-600 font-medium hover:text-indigo-500"
                                                                                onClick={() => setOpen(false)}
                                                                            >
                                                                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                                            </button>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </Transition.Root>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
