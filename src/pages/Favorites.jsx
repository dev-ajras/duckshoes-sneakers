import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

function Favorites() {
  const { favorites } = useContext(AppContext);

  return (
    <section>
      <h3 className="font-bold text-lg pt-2 mx-3">Favorites</h3>
      <div>
        {favorites.map((favorite) => (
          <div key={favorite.id}>{favorite.name}</div>
        ))}
      </div>
    </section>
  );
}

export default Favorites;
