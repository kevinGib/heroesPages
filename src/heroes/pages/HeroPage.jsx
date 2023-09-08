import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../helpers';

export const HeroPage = () => {
	const { heroId } = useParams();
	const navigate = useNavigate();

	const hero = useMemo(() => getHeroById(heroId), [heroId]);
	if (!hero) {
		return <Navigate to={'/marvel'} />;
	}

	const onNavigateBack = () => {
		navigate(`/${hero.publisher === 'Marvel Comics' ? 'marvel' : 'dc'}`);
	};

	return (
		<div className='row mt-5'>
			<div className='col-4'>
				<img
					src={`/assets/heroes/${heroId}.jpg`}
					alt={hero.superhero}
					className='img-thumbnail'
				/>
			</div>

			<div className='col-8'>
				<h3>{hero.superhero}</h3>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<b>Alter Ego:</b> {hero.alter_ego}
					</li>
					<li className='list-group-item'>
						<b>Publisher:</b> {hero.publisher}
					</li>
					<li className='list-group-item'>
						<b>First Appearance:</b> {hero.first_appearance}
					</li>
				</ul>

				<h5 className='mt-3'> Characters</h5>
				<p>{hero.characters}</p>

				<button className='btn btn-outline-primary' onClick={onNavigateBack}>
					Regrear
				</button>
			</div>
		</div>
	);
};
