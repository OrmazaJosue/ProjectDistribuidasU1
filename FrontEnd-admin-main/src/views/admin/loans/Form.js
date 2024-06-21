import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import bookService from "services/bookService";
import loanService from "services/loanService";
import userService from "services/userService";
import Swal from "sweetalert2";

export default function LoanForm()
{
    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])

    const [user_id, setUserId] = useState('')
    const [book_isbn, setBookIsbn] = useState('')
    const [loan_date, setLoanDate] = useState('')
    const [return_date, setReturnDate] = useState('')
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')

    const { id } = useParams()

    useEffect(() => {
        getData()

        if (id)
            setLoan()
    }, []);

    const setLoan = async _ => {
        try {
            const res = await loanService.get(id)
            const loan = res.data

            setBookIsbn(loan.book.isbn)
            setUserId(loan.user.id)
            setLoanDate(loan.loan_date)
            setReturnDate(loan.return_date)
            setStatus(loan.status)
            setNotes(loan.notes)

        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        const users = await userService.get()
        const books = await bookService.get()
        setUsers(users.data)
        setBooks(books.data)
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            let loans = await loanService.get()
            loans = loans.data;

            const newId = (loans.length > 0) ? loans[loans.length - 1].id + 1 : 1;

            const { data } = id
                ? await loanService.put(id, { user_id, book_isbn, loan_date, return_date, status, notes })
                : await loanService.post({ id: newId, user_id, book_isbn, loan_date, return_date, status, notes })
            ;

            await Swal.fire({
                title: data,
                icon: 'success',
            })

            window.location.href = '/loans'
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
                                    to="/loans"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                </Link>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                                        Préstamo
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <div className="p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 pt-0">
                                        <label>Usuario</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <select
                                            value={user_id}
                                            onChange={({ target }) => setUserId(target.value)}
                                            defaultValue={''}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        >
                                            <option value={''}>Seleccione...</option>
                                            {users.map((element, index) => (
                                                <option key={index} value={element.id}>{element.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Libro</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <select
                                            value={book_isbn}
                                            onChange={({ target }) => setBookIsbn(target.value)}
                                            defaultValue={''}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        >
                                            <option value={''}>Seleccione...</option>
                                            {books.map((element, index) => (
                                                <option key={index} value={element.isbn}>{element.title}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Fecha de Préstamo</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={loan_date}
                                            onChange={({ target }) => setLoanDate(target.value)}
                                            type="date"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Fecha de Devolución</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={return_date}
                                            onChange={({ target }) => setReturnDate(target.value)}
                                            type="date"
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        />
                                    </div>

                                    <div className="mb-3 pt-0">
                                        <label>Estado</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <select
                                            value={status}
                                            onChange={({ target }) => setStatus(target.value)}
                                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="disponible">Disponible</option>
                                            <option value="prestado">Prestado</option>
                                            <option value="reservado">Reservado</option>
                                            <option value="No disponible">No disponible</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <label>Notas</label>
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input
                                            value={notes}
                                            onChange={({ target }) => setNotes(target.value)}
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