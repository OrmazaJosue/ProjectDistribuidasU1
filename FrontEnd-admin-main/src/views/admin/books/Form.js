import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import authorService from "services/authorService";
import bookService from "services/bookService";
import Swal from "sweetalert2";

export default function BookForm() {
    const [authors, setAuthors] = useState([])

    const [isbn, setIsbn] = useState([])
    const [title, setTitle] = useState('')
    const [author_id, setAuthorId] = useState('')
    const [publisher, setPublisher] = useState('')
    const [year, setYear] = useState('')
    const [price, setPrice] = useState('')
    const [pages, setPages] = useState('')

    const { id } = useParams()

    useEffect(() => {
        getAuthors()

        if (id)
            setBook()
    }, []);

    const getAuthors = async _ => {
        try {
            const res = await authorService.get()
            setAuthors(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const setBook = async _ => {
        try {
            const res = await bookService.get(id)
            const book = res.data

            setIsbn(book.isbn)
            setTitle(book.title)
            setAuthorId(book.author_id)
            setPublisher(book.publisher)
            setYear(book.year)
            setPrice(book.price)
            setPages(book.pages)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (id) {
                await bookService.put(id, { isbn, title, author_id, publisher, year, price, pages })
            } else {
                await bookService.post({ isbn, title, author_id, publisher, year, price, pages })
            }

            await Swal.fire({
                title: 'Se guardo correctamente',
                icon: 'success',
            })
            window.location.href = '/books'
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
                                    to="/books"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                        Libros
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <div className="p-5">
                                <form onSubmit={handleSubmit}>
                                <div className="mb-3 pt-0">
                                        <label>ISBN</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={isbn}
                                            onChange={({ target }) => setIsbn(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Título</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={title}
                                            onChange={({ target }) => setTitle(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Autor</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <select
                                            value={author_id}
                                            onChange={({ target }) => setAuthorId(target.value)}
                                            defaultValue={''}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        >
                                            <option value={''}>Seleccione...</option>
                                            {authors.map((element, index) => (
                                                <option key={index} value={element.id}>{element.first_name} {element.last_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Editorial</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={publisher}
                                            onChange={({ target }) => setPublisher(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Año de Publicación</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={year}
                                            onChange={({ target }) => setYear(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Precio</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={price}
                                            onChange={({ target }) => setPrice(target.value)}
                                            type="text"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Número de Páginas</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={pages}
                                            onChange={({ target }) => setPages(target.value)}
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