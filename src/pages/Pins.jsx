import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { OWNER_USER_ID } from "../data/constant.js";
import { useGetUserId } from "../hooks/useGetUserId.js";
import { buildUrl } from "../utils/buildUrl";
import Logout from "../components/Logout";
import ChangePassword from "../components/ChangePassword";
import TopLoadingBar from "react-top-loading-bar";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { ReactComponent as Loading } from "../assets/loading.svg";

function Pins() {
	const date = new Date();
	const [pinName, setPinName] = useState("");
	const [pinLink, setPinLink] = useState("");
	const [firstName, setFirstName] = useState("");
	const [isAddPhoto, setIsAddPhoto] = useState(false);
	const [imageLink, setImageLink] = useState("");
	const [responseImage, setResponseImage] = useState("");
	const [pinsLoaded, setPinsLoaded] = useState(false);
	const [nameLoaded, setNameLoaded] = useState(false);
	const [isSuccessPinsLoad, setSuccessPinsLoad] = useState(false);
	const [pins, setAllPins] = useState([]);
	const [isChangePassword, setIsChangePassword] = useState(false);
	const [progress, setProgress] = useState(0);
	const location = useLocation();
	const [isAddCategory, setIsAddCategory] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [options, setOptions] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [createPinCat, setCreatePinCat] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const userID = useGetUserId();

	const fetchAllCategories = async () => {
		try {
			const response = await axios.get(buildUrl(`category/categories/${userID}`));
			const fetchedCategories = response.data.cats.map((cat) => ({
				value: cat.name,
				label: cat.name,
				id: cat._id,
			}));
			setOptions([
				...fetchedCategories,
				{ value: "All Categories", label: "All Categories" },
			]);
		} catch (err) {
			console.error(err);
		}
	};

	const fetchAllPins = async () => {
		setPinsLoaded(true);
		try {
			const response = await axios.get(buildUrl(`pins/all/${userID}`));
			setAllPins(response.data);
			setPinsLoaded(false);
		} catch (err) {
			console.log(err);
		}
	};

	const createCategory = async (e) => {
		e.preventDefault();
		try {
			await axios.post(buildUrl(`category/add/${userID}`), {
				categoryName,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const createPin = async (e) => {
		e.preventDefault();
		setSuccessPinsLoad(true);
		try {
			await axios.post(buildUrl(`pins/add-pin`), {
				pinName,
				pinLink,
				pinOwner: userID,
				pinCategory: createPinCat,
			});
			setSuccessPinsLoad(false);
			await fetchAllPins();
		} catch (err) {
			console.log(err);
		}
	};

	const getFirstName = async () => {
		setNameLoaded(true);
		try {
			const response = await axios.get(buildUrl(`auth/firstname/${userID}`));
			setFirstName(response.data);
			setNameLoaded(false);
		} catch (e) {
			console.log(e);
		}
	};

	const deletePin = async (id) => {
		try {
			await axios.delete(buildUrl(`pins/delete/${id}`));
			console.log(id);
			fetchAllPins();
		} catch (err) {
			console.log(err);
		}
	};

	const addImage = async (e) => {
		e.preventDefault();
		try {
			await axios.put(buildUrl(`auth/photo/${userID} `), {
				imageUrl: imageLink,
			});

			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	const getImageLink = async () => {
		try {
			const response = await axios.get(buildUrl(`auth/image/${userID}`));
			setResponseImage(response.data);
			// console.log("Image fetched successfully");
		} catch (err) {
			console.log(err);
		}
	};

	const fetchPinsByCategory = async () => {
		setPinsLoaded(true);
		console.log(selectedCategory);
		console.log(buildUrl(`category/selectCategory/${userID}`));
		try {
			const response = await axios.get(
				buildUrl(`category/selectCategory/${selectedCategory}/${userID}`)
			);

			setAllPins(response.data.pins);
			setPinsLoaded(false);
		} catch (err) {
			setError(err.response.data);
			setAllPins([]);
			setPinsLoaded(false);
		}
	};

	useEffect(() => {
		if (!userID) {
			alert("Please login first");
			navigate("/auth/login");
		}

		getImageLink();
		fetchAllCategories();
		fetchAllPins();
		getFirstName();
	}, []);

	useEffect(() => {
		setProgress(30);
		setTimeout(() => {
			setProgress(100);
		}, 1500);
	}, [location]);

	useEffect(() => {
		if (selectedCategory === "All Categories") {
			fetchAllPins();
		} else {
			fetchPinsByCategory();
		}
	}, [selectedCategory]);

	return (
		<div className='m-8 overflow-x-hidden  md:m-20'>
			<Logout />
			<TopLoadingBar
				color='#0085FF'
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
				height={6}
			/>
			<div>
				<div className='flex flex-row gap-7 my-16 place-content-center items-center'>
					{responseImage ? (
						<img
							src={responseImage}
							alt='profile'
							className='w-24 h-auto rounded-full md:w-32 border-2 border-[#0085FF]'
							onClick={() => setIsAddPhoto(!isAddPhoto)}
						/>
					) : (
						<div
							className='grid place-items-center bg-[#2c2c2c] px-4 py-6 rounded-full'
							onClick={() => setIsAddPhoto(!isAddPhoto)}>
							<AiOutlineCamera className='text-white text-2xl' />
							<p className='text-lg text-sm'>Add Photo</p>
						</div>
					)}
					<div>
						<div className='flex flex-row gap-2 items-center'>
							<h1 className='text-md font-body font-normal text-white md:text-3xl'>
								Welcome Back!
							</h1>
							<IoMdSettings
								className='text-white xxsm:text-xl lg:text-2xl xl:text-3xl ml-3 cursor-pointer'
								onClick={() => setIsChangePassword(!isChangePassword)}
							/>
						</div>
						{!nameLoaded ? (
							<h1 className='text-2xl font-body font-semibold text-blue md:text-5xl'>
								{firstName}
							</h1>
						) : (
							<Loading className='p-10' />
						)}
						{OWNER_USER_ID === userID ? (
							<div className='flex flex-row items-center mt-2'>
								<h1 className='mt-1 font-body font-semibold text-white italic bg-blue px-2 pl-4 rounded-sm w-full flex items-center'>
									<img
										src='https://cultofthepartyparrot.com/flags/hd/iranparrot.gif'
										width='25'
										height='25'
										className='relative mr-3 pb-2'
									/>
									PinPal Dev
								</h1>
							</div>
						) : null}
					</div>
				</div>
				<ChangePassword isChangePassword={isChangePassword} />
				{isAddPhoto && (
					<div>
						<form
							onSubmit={addImage}
							className='flex flex-col gap-2 border-2 border-[#1F1F1F] rounded-md py-4 px-6 shadow-2xl mt-6'>
							<input
								type='text'
								placeholder='Paste Image Url Here'
								className='bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full'
								required
								onChange={(e) => setImageLink(e.target.value)}
							/>
							<button
								type='submit'
								className='font-body font-regular text-sm text-white bg-blue rounded-md focus:outline-none w-full py-2'>
								Add Photo
							</button>
						</form>
					</div>
				)}
				<form
					onSubmit={createPin}
					className='flex flex-col gap-2 border-2 border-[#1F1F1F] rounded-md py-4 px-6 shadow-2xl mt-6'>
					<input
						type='text'
						placeholder='Enter Pin Title (e.g Facebook Portal)'
						className='bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full'
						required
						onChange={(e) => setPinName(e.target.value)}
					/>
					<div className='flex flex-row gap-2'>
						<input
							type='text'
							placeholder='Paste URL (e.g https://facebook.com)'
							className='bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-9/12'
							required
							onChange={(e) => setPinLink(e.target.value)}
						/>
						<Dropdown
							options={options}
							placeholder='Select Catergory of Pins'
							className=''
							controlClassName='bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full'
							menuClassName='rounded-md p-2 font-body font-medium text-sm text-black focus:outline-none w-full'
							onChange={(e) => setCreatePinCat(e.value)}
							key={options.map((option) => option.id).join("-")}
						/>
						<button
							type='submit'
							className='font-body font-regular text-sm text-white bg-blue rounded-md focus:outline-none w-5/12'>
							Add Pin
						</button>
					</div>
					{isSuccessPinsLoad && <Loading className='p-10' />}
				</form>
				<div className='grid grid-cols-2 gap-4 items-center'>
					<div className='flex flex-col gap-4'>
						<button
							onClick={() => setIsAddCategory(!isAddCategory)}
							className='bg-blue py-2 px-4 rounded-md font-bold text-white w-full my-4'>
							Add New Category
						</button>
					</div>
					<Dropdown
						options={options}
						placeholder='Select Catergory of Pins'
						className=''
						controlClassName='bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full'
						menuClassName='rounded-md p-2 font-body font-medium text-sm text-black focus:outline-none w-full'
						onChange={(e) => setSelectedCategory(e.value)}
						key={options.map((option) => option.id).join("-")}
					/>
				</div>
				{isAddCategory && (
					<form
						onSubmit={createCategory}
						className='flex flex-col gap-2 border-2 border-[#1F1F1F] rounded-md py-4 px-6 shadow-2xl mb-4'>
						<input
							type='text'
							placeholder='Enter Category Name'
							className='bg-[#3b3b3b] rounded-md p-2 font-body font-medium text-sm text-white focus:outline-none w-full'
							required
							onChange={(e) => setCategoryName(e.target.value)}
						/>
						<button
							type='submit'
							className='font-body font-regular text-sm text-white bg-blue rounded-md py-2 focus:outline-none w-full'>
							Add Category
						</button>
					</form>
				)}
			</div>
			<h1 className='font-extrabold text-4xl text-white'>{selectedCategory}</h1>

			{!pinsLoaded ? (
				<div className='mt-9 xxxsm:flex flex-col gap-2 xxsm:flex flex-col gap-2 sm:flex flex-col gap-2 md:grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4'>
					{Array.isArray(pins) &&
						pins.map((pin) => (
							<div
								className='flex flex-row justify-between gap-4 bg-[#2D2D2D] py-2 px-4 rounded-md items-center hover:bg-[#4b4b4b] duration-300'
								key={pin._id}>
								<a
									href={pin.pinLink}
									target='_blank'
									className='font-body font-medium text-sm text-white'>
									{pin.pinName}
								</a>
								<div className='flex flex-row gap-2'>
									<a
										href={pin.pinLink}
										target='_blank'>
										<FiArrowUpRight className='text-white text-xl' />
									</a>
									<BsTrash
										className='text-white text-xl cursor-pointer'
										onClick={() => deletePin(pin._id)}
									/>
								</div>
							</div>
						))}
				</div>
			) : (
				<Loading />
			)}
			{pins.length === 0 && (
				<h1 className='font-extrabold text-blue'>No pins found in this category</h1>
			)}
		</div>
	);
}

export default Pins;
