import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroByName } from '../helpers';

export const SearchPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { q = '' } = queryString.parse(location.search);

	const heroes = getHeroByName(q);

	const showSearch = q.length === 0;
	const showError = q.length > 0 && heroes.length === 0;

	const { searchText, onInputChange, onResetForm } = useForm({
		searchText: q,
	});

	const onSearchSubmit = e => {
		e.preventDefault();
		navigate(`?q=${searchText.toLowerCase().trim()}`);
	};

	return (
		<>
			<h1>Search</h1>
			<hr />

			<div className='row'>
				<div className='col-5'>
					<h4>Searching</h4>
					<hr />

					<form onSubmit={onSearchSubmit} aria-label='form'>
						<input
							type='text'
							placeholder='Search a hero'
							className='form-control'
							name='searchText'
							autoComplete='off'
							value={searchText}
							onChange={onInputChange}
						/>

						<button className='btn btn-outline-primary mt-1'>Search</button>
					</form>
				</div>

				<div className='col-7'>
					<h4>Results</h4>
					<hr />

					<div
						aria-label='pr-alert'
						className='alert alert-primary'
						style={{ display: showSearch ? '' : 'none' }}
					>
						Search a Hero
					</div>

					<div
						aria-label='dg-alert'
						className='alert alert-danger'
						style={{ display: showError ? '' : 'none' }}
					>
						No hero with <b>{q}</b>
					</div>

					{heroes.map(hero => (
						<HeroCard key={hero.id} {...hero} />
					))}
				</div>
			</div>
		</>
	);
};
