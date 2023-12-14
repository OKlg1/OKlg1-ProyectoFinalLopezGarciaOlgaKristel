import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from "../config/firebaseConfig"

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const [products, setProducts] = useState([]);

	const getProductsDB = (category) => {
		const myProducts = category ? query(collection(db, "products"), where("category", "==", category)) : query(collection(db, "products"));
		getDocs(myProducts)
			.then((resp) => {

				const allProducts = resp.docs.map(doc => {
					const setAllProducts = {
						id: doc.id,
						...doc.data()
					};

					return setAllProducts;
				})

				console.log(allProducts);

				setProducts(allProducts);

			})
			.catch(error => console.log(error));
	}

	useEffect(() => {

		getProductsDB()

	}, []);

	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	return (
		<div className='container-items'>
			<button className='category-button' onClick={() => getProductsDB()}>
				Todo
			</button>
			<button className='category-button' onClick={() => getProductsDB("Mujer")}>
				Mujer
			</button>
			<button className='category-button' onClick={() => getProductsDB("Hombre")}>
				Hombre
			</button>
			{products.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h2>{product.nameProduct}</h2>
						<p className='category'>{product.category}</p>
						<p className='price'>${product.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};


