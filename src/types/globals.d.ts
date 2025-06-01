
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: any);
      panTo(latLng: any): void;
      setZoom(zoom: number): void;
    }
    
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }
    
    class InfoWindow {
      constructor(opts?: any);
      close(): void;
      setContent(content: string): void;
      open(opts: any): void;
    }
    
    class Marker {
      constructor(opts: any);
      addListener(event: string, handler: () => void): void;
      setMap(map: Map | null): void;
    }
    
    class StreetViewPanorama {
      constructor(node: Element, opts?: any);
      setPosition(latLng: any): void;
    }
    
    enum Animation {
      DROP = 'DROP'
    }
    
    namespace places {
      class PlacesService {
        constructor(attrContainer: HTMLDivElement);
        textSearch(request: TextSearchRequest, callback: (results: PlaceResult[] | null, status: PlacesServiceStatus) => void): void;
      }
      
      interface TextSearchRequest {
        query: string;
        location?: LatLng;
        radius?: number;
      }
      
      interface PlaceResult {
        place_id?: string;
        name?: string;
        vicinity?: string;
        formatted_address?: string;
        geometry?: {
          location?: LatLng;
        };
        rating?: number;
        website?: string;
        photos?: PlacePhoto[];
        types?: string[];
        opening_hours?: {
          open_now?: boolean;
          weekday_text?: string[];
        };
        reviews?: PlaceReview[];
      }
      
      interface PlacePhoto {
        getUrl(opts: { maxWidth: number }): string;
      }
      
      interface PlaceReview {
        author_name?: string;
        rating?: number;
        text?: string;
        time?: number;
      }
      
      enum PlacesServiceStatus {
        OK = 'OK',
        ERROR = 'ERROR',
        INVALID_REQUEST = 'INVALID_REQUEST',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
        ZERO_RESULTS = 'ZERO_RESULTS'
      }
    }
  }
}

export {};
