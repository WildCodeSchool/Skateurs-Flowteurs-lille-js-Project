import { useEffect, useRef, useState } from "react";
import styles from "./SearchBar.module.css";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

interface PlaceAutocompleteProps {
  onPlaceSelect?: (place: google.maps.places.PlaceResult | null) => void;
}

const SearchBar = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    const listener = placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      if (onPlaceSelect) onPlaceSelect(place);
    });

    return () => {
      listener.remove();
    };
  }, [placeAutocomplete, onPlaceSelect]);

  return (
    <input
      ref={inputRef}
      id="search-spot"
      name="search-spot"
      type="text"
      placeholder="Rechercher un spot..."
      className={styles.SearchBar}
    />
  );
};

export default SearchBar;
