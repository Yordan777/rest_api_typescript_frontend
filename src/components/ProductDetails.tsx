import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { FormatCurrency } from "../utils/indesx";
import { deleteProduct } from "../services/ProductServices";

type ProductDetailsProsp = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({ product }: ProductDetailsProsp) {
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const isAvailable = product.available
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {FormatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        name='id'
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</button>

                    <Form
                        method="POST"
                        action={`/productos/${product.id}/eliminar`}
                        className="w-full"
                        onSubmit={
                            (e) => {
                                if (!confirm('Eliminar')) {
                                    e.preventDefault()
                                }
                            }
                        }
                    >

                        <input
                            type="submit"
                            value="Eliminar"
                            className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
