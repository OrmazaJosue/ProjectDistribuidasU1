import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import authorService from "services/authorService";
import Swal from "sweetalert2";

export default function AuthorForm() {

    const [ first_name, setFirstName ] = useState('')
    const [ last_name, setLastName ] = useState('')
    const [ birthdate, setBirthdate ] = useState('')
    const [ nationality, setNationality ] = useState('')
    const [ biography, setBiography ] = useState('')
    const [ website, setWebsite ] = useState('')

    const { id } = useParams()

    useEffect(() => {
        if (id)
            setAuthor()
    }, [id]);

    const setAuthor = async _ => {
        try {
            const res = await authorService.get(id)
            const author = res.data

            setFirstName(author.first_name)
            setLastName(author.last_name)
            setBirthdate(author.birthdate)
            setNationality(author.nationality)
            setBiography(author.biography)
            setWebsite(author.website)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            if (id) {
                await authorService.put(id, { first_name, last_name, birthdate, nationality, biography, website })
            } else {
                const { data } = await authorService.get()
                const newId = (data.length > 0) ? data[data.length - 1].id + 1 : 1;

                await authorService.post({ id: newId, first_name, last_name, birthdate, nationality, biography, website })
            }
            await Swal.fire({
                title: 'Se guardo correctamente',
                icon: 'success',
            })
            window.location.href = '/authors'
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
                                    to="/authors"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                        Autores
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <div className="p-5">
                                <form onSubmit={ handleSubmit }>
                                    <div className="mb-3 pt-0">
                                        <label>Nombres</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={first_name}
                                            onChange={ ({target}) => setFirstName(target.value) }
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Apellidos</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={last_name}
                                            onChange={ ({target}) => setLastName(target.value) }
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Fecha de Nacimiento</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={birthdate}
                                            onChange={ ({target}) => setBirthdate(target.value) }
                                            type="date"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Nacionalidad</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={nationality}
                                            onChange={ ({target}) => setNationality(target.value) }
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Biografía</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={biography}
                                            onChange={ ({target}) => setBiography(target.value) }
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Sitio Web</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={website}
                                            onChange={ ({target}) => setWebsite(target.value) }
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