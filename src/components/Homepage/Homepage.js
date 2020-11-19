import React, { Fragment, useEffect, useState } from 'react'
import loader from './loading.gif'

import './homepage.css'
const Homepage = () => {
	const [ cardStyle, setCardStyle ] = useState(false)

	const [ info, setinfo ] = useState(false)
	const [ formValue, setFormValue ] = useState('')
	const [ data, setData ] = useState(false)
	const [ loading, setLoading ] = useState(false)

	const card = () => {
		if (cardStyle) {
			return {
				opacity: '1',
				transform: 'translateY(0)',
				transitionProperty: 'transform',
				transitionDuration: '1s'
			}
		} else {
			return { opacity: '0', transform: 'translateY(2000px)' }
		}
	}
	const onClick = async (e) => {
		e.preventDefault()

		// setData(true);
		// setCardStyle(true);
		// console.log(e);
		// console.log(e.target.id);
		const tar = e.target
		const tarId = e.target.id
		if (tar && tarId === 'sub') {
			setLoading(true)
			//   const res = await fetch('http://localhost:5000/city/' + formValue)
			const res = await fetch('https://weatherapplicationn123.herokuapp.com/city/' + formValue)
			//   console.log(res)
			if (res.status === 200) {
				const data = await res.json()
				console.log(data)
				setData(data)
				setLoading(false)
				setinfo(false)
				setCardStyle(true)
				setFormValue('')
			} else if (res.status !== 200) {
				setLoading(false)
				setinfo(true)
				setCardStyle(false)
			}
		}
		if (tar && tarId === 'coord') {
			const coord = async (p) => {
				const lat = p.coords.latitude
				const lon = p.coords.longitude

				setLoading(true)
				const response = await fetch(`https://weatherapplicationn123.herokuapp.com/pos/${lat}/${lon}`)

				const data = await response.json()
				setData(data)
				setLoading(false)
				setCardStyle(true)
			}
			const loc = () => {
				if (navigator.geolocation) {
					return navigator.geolocation.getCurrentPosition(coord)
				}
			}
			loc()
		}
		// console.log(formValue);
	}
	// console.log(data);

	useEffect(
		() => {
			const counters = document.querySelectorAll('.counter')
			const speed = 100 // The lower the slower

			// console.log(counters)
			counters.forEach((counter) => {
				const updateCount = () => {
					const target = +counter.getAttribute('data-target')
					const count = +counter.innerText

					// Lower inc to slow and higher to slow
					const inc = target / speed

					// console.log(inc);
					// console.log(count)

					// Check if target is reached
					if (count < target) {
						// Add inc to count and output in counter
						const anim = Number(count + inc).toFixed(1)
						counter.innerText = anim
						// Call function every ms
						setTimeout(updateCount, 1)
					} else {
						counter.innerText = target
					}
				}

				updateCount()
			})
		},
		[ loading ]
	)
	const err = () => {
		if (info) {
			return <h1 className='error-title'>Please enter your city name</h1>
		}
	}
	return (
		<div className='main-header'>
			<div className='header-container'>
				<div className='header-content'>
					<form>
						<input
							className='city-inp'
							onChange={(e) => setFormValue(e.target.value)}
							value={formValue}
							type='text'
							placeholder='CITY NAME'
						/>
						<div className='btns'>
							<button type='submit' onClick={onClick} id='sub' className='btn inp'>
								Submit City
							</button>
							<button type='submit' id='coord' onClick={onClick} className='btn loc'>
								Current Location
							</button>
						</div>
					</form>
				</div>
			</div>
			{loading && (
				<div className='load-container'>
					<img src={loader} alt='' className='loading' />
					{/* <h1>Loading...</h1> */}
				</div>
			)}
			<div className='info-container'>
				{err()}
				<div style={card()} className='info-content'>
					{data ? (
						<Fragment>
							<div className='card-body'>
								<h5 className='card-title' />
								<h6 className='card-subtitle'>{data.name}</h6>
								<div className='card-info '>
									<div className='card-text left '>
										<span>Temparature :</span>
										<h6 className='counter' data-target={data.main.temp}>
											0
										</h6>
									</div>
									<div className='card-text right'>
										<span>MAX Temp :</span>
										<h6 className='counter' data-target={data.main.temp_max}>
											0
										</h6>
									</div>
								</div>
								<div className='card-info'>
									<div className='card-text left'>
										<span>Humidity :</span>
										<h6 className='counter' data-target={data.main.humidity}>
											0
										</h6>
									</div>
									<div className='card-text right'>
										<span> Pressure :</span>
										<h6 className='counter' data-target={data.main.pressure}>
											0
										</h6>
									</div>
								</div>
								<div className='c-link'>
									<a target='_blank' href={`https://www.google.com/search?q=${data.name}+weather`}>
										<button className='card-link'>More Info</button>
									</a>
								</div>
							</div>
						</Fragment>
					) : (
						<Fragment>
							<div className='card-info '>
								<div className='card-text left '>
									<span />
									<h6 className='counter' data-target='50' />
								</div>
								<div className='card-text right'>
									<span />
									<h6 className='counter' data-target='50' />
								</div>
							</div>
							<div className='card-info'>
								<div className='card-text left'>
									<span />
									<h6 className='counter' data-target='76' />
								</div>
								<div className='card-text right'>
									<span />
									<h6 className='counter' data-target='102' />
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</div>
			{/* <div className='info-container'>
				<div className='info-content'>
					<Fragment>
						<div className='card-body'>
							<h5 className='card-title' />
							<h6 className='card-subtitle'>Delhi</h6>
							<div className='card-info '>
								<p className='card-text left '>
									<span>Temparature :</span> 
									<h6 className='counter' data-target='50'>
								0
									</h6>
								</p>
								<p className='card-text right'>
									<span>MAX Temp :</span>
									<h6 className='counter' data-target='50'>
										0
									</h6>
								</p>
							</div>
							<div className='card-info'>
								<p className='card-text left'>
									<span>Humidity :</span>
									<h6 className='counter' data-target='76'>
										0
									</h6>
								</p>
								<p className='card-text right'>
									<span> Pressure :</span>
									<h6 className='counter' data-target='102'>
										0
									</h6>
								</p>
							</div>
							<div className='c-link'>
								<a target='_blank' href={`https://www.google.com/search?q=${data.name}+weather`}>
									<button className='card-link'>More Info</button>
								</a>
							</div>
						</div>
					</Fragment>
				</div>
			</div> */}
		</div>
	)
}

export default Homepage
