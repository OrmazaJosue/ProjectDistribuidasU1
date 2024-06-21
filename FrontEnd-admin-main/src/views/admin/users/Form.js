import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import userService from "services/userService";
import Swal from "sweetalert2";

export default function UserForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [address, setAddress] = useState('')
    const [phone_number, setPhoneNumber] = useState('')

    const { id } = useParams()

    useEffect(() => {
        if (id)
            setUser()
    }, [id]);

    const setUser = async _ => {
        try {
            const res = await userService.get(id)
            const user = res.data

            setName(user.name)
            setEmail(user.email)
            
            setBirthDate(user.birthdate)
            setAddress(user.address)
            setPhoneNumber(user.phone_number)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const userAux = await userService.get()
            const newId = (userAux.length > 0) ? userAux[userAux.length - 1].id + 1 : 1;

            const { data } = (id)
                ? await userService.put(id, { name, email, birthdate: birthDate, address, phone_number })
                : await userService.post({ id: newId, name, email, birthdate: birthDate, address, phone_number })
            ;

            await Swal.fire({
                title: data,
                icon: 'success',
            })

            window.location.href = '/users'
        } catch (error) {
            const { data, status } = error

            let mgs = '';
            if (status == 422 && data.error) {
                for (let key in data.error) {
                    if (data.error.hasOwnProperty(key))
                        mgs += `<p>${key}: ${data.error[key]}</p>`
                }
                
                Swal.fire({
                    title: 'Error de validaciones',
                    html: mgs,
                    icon: 'error',
                })
            }
        }
    }

    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"}>
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <Link
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    to="/users"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                        Usuario
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <div className="p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 pt-0">
                                        <label>Nombre</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={name}
                                            onChange={({ target }) => setName(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Correo Electrónico</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={email}
                                            onChange={({ target }) => setEmail(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Fecha de Nacimiento</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={birthDate}
                                            onChange={({ target }) => setBirthDate(target.value)}
                                            type="date"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Dirección</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={address}
                                            onChange={({ target }) => setAddress(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Teléfono</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={phone_number}
                                            onChange={({ target }) => setPhoneNumber(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <hr />

                                    <div className="mt-3 pt-0">
                                        <button
                                            type="submit"
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        >Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}