
import { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search, ExternalLink, Info, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Layout from '../components/layout/Layout';

type College = {
  id: string;
  name: string;
  address: string;
  formatted_address?: string;
  location: {
    lat: number;
    lng: number;
  };
  rating?: number;
  website?: string;
  phone?: string;
  photos?: string[];
  types?: string[];
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  } | null;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
};

// Default location (center of India)
const DEFAULT_LOCATION = { lat: 20.5937, lng: 78.9629 };

// Google Maps services
let placesService: google.maps.places.PlacesService | null = null;

// Initialize Google Maps services
const initGoogleMapsServices = (): void => {
  if (window.google?.maps?.places) {
    placesService = new google.maps.places.PlacesService(document.createElement('div'));
  }
};

export default function CollegeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showStreetView, setShowStreetView] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const streetViewRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const streetViewPanorama = useRef<google.maps.StreetViewPanorama | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Initialize map
  const initMap = useCallback(() => {
    if (!mapRef.current) return;

    try {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: DEFAULT_LOCATION,
        zoom: 5,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi.school',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'poi.university',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
          }
        ]
      });
      
      // Initialize Street View if the reference exists
      if (streetViewRef.current) {
        streetViewPanorama.current = new google.maps.StreetViewPanorama(streetViewRef.current, {
          position: DEFAULT_LOCATION,
          pov: { heading: 0, pitch: 0 },
          zoom: 1,
          addressControl: false,
          showRoadLabels: false
        });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Failed to load Google Maps. Please try again later.');
    }
  }, []);

  // Update markers on the map
  const updateMarkers = useCallback((collegesToMark: College[]) => {
    if (!mapInstance.current || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create a new InfoWindow
    if (!infoWindowRef.current) {
      infoWindowRef.current = new window.google.maps.InfoWindow();
    }

    // Add new markers
    collegesToMark.forEach(college => {
      const marker = new window.google.maps.Marker({
        position: college.location,
        map: mapInstance.current,
        title: college.name,
        animation: window.google.maps.Animation.DROP,
      });

      // Create info window content
      const content = `
        <div class="p-2">
          <h3 class="font-semibold">${college.name}</h3>
          <p class="text-sm">${college.formatted_address || college.address}</p>
          ${college.rating ? `
            <div class="flex items-center mt-1">
              <span class="text-yellow-500">
                ${'★'.repeat(Math.floor(college.rating))}${'☆'.repeat(5 - Math.floor(college.rating))}
              </span>
              <span class="ml-1 text-sm text-gray-600">(${college.rating.toFixed(1)})</span>
            </div>` : ''}
        </div>
      `;

      // Add click listener to marker
      marker.addListener('click', () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
        
        if (infoWindowRef.current) {
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open({
            anchor: marker,
            map: mapInstance.current,
            shouldFocus: false,
          });
        }
        
        setSelectedCollege(college);
        if (mapInstance.current) {
          mapInstance.current.panTo(college.location);
          mapInstance.current.setZoom(15);
        }
        
        // Update Street View if enabled
        if (showStreetView && streetViewPanorama.current) {
          streetViewPanorama.current.setPosition(college.location);
        }
      });

      markersRef.current.push(marker);
    });

    // Center map on first result if available
    if (collegesToMark.length > 0 && mapInstance.current) {
      mapInstance.current.panTo(collegesToMark[0].location);
      mapInstance.current.setZoom(12);
    }
  }, [showStreetView]);

  // Search for colleges using Google Places API
  const searchColleges = useCallback(async (query: string): Promise<College[]> => {
    if (!placesService) {
      console.error('Places service not initialized');
      return [];
    }
    
    return new Promise((resolve) => {
      const request: google.maps.places.TextSearchRequest = {
        query: `${query} college`,
        location: new google.maps.LatLng(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng),
        radius: 50000, // 50km radius
      };

      if (!placesService) {
        resolve([]);
        return;
      }
      
      placesService.textSearch(request, (
        results: google.maps.places.PlaceResult[] | null, 
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const colleges: College[] = results.map((place, index) => {
            const location = place.geometry?.location;
            return {
              id: place.place_id || `college-${index}`,
              name: place.name || 'Unknown College',
              address: place.vicinity || '',
              formatted_address: place.formatted_address,
              location: {
                lat: location?.lat() || 0,
                lng: location?.lng() || 0
              },
              rating: place.rating,
              website: place.website as string | undefined,
              photos: place.photos?.map(photo => 
                photo.getUrl({ maxWidth: 800 })
              ),
              types: place.types,
              opening_hours: place.opening_hours ? {
                open_now: place.opening_hours.open_now || false,
                weekday_text: place.opening_hours.weekday_text
              } : undefined,
              reviews: place.reviews?.map(review => ({
                author_name: review.author_name || 'Anonymous',
                rating: review.rating || 0,
                text: review.text || '',
                time: review.time || 0
              }))
            };
          });
          resolve(colleges);
        } else {
          console.error('Error searching for colleges:', status);
          resolve([]);
        }
      });
    });
  }, []);

  // Download AICTE approved colleges PDF
  const downloadAictePdf = () => {
    console.log('Downloading AICTE PDF...');
    window.open('https://www.aicte-india.org/sites/default/files/Engineering.pdf', '_blank');
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const results = await searchColleges(searchQuery);
      setColleges(results);
      updateMarkers(results);
      
      if (results.length > 0) {
        setSelectedCollege(results[0]);
        
        // Update map view
        if (mapInstance.current) {
          mapInstance.current.panTo(results[0].location);
          mapInstance.current.setZoom(14);
        }
        
        // Update Street View if enabled
        if (showStreetView && streetViewPanorama.current) {
          streetViewPanorama.current.setPosition(results[0].location);
        }
      } else {
        setError('No colleges found. Try a different search term.');
      }
    } catch (error) {
      console.error('Error searching colleges:', error);
      setError('Failed to search for colleges. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle street view
  const toggleStreetView = useCallback(() => {
    setShowStreetView(prev => {
      // Will be the opposite of current state
      const newState = !prev;
      
      // If turning ON street view and we have a selected college, update the panorama
      if (newState && selectedCollege && streetViewPanorama.current) {
        streetViewPanorama.current.setPosition(selectedCollege.location);
      }
      
      return newState;
    });
  }, [selectedCollege]);

  // Initialize Google Maps when component mounts
  useEffect(() => {
    // Check if Google Maps is already loaded
    if (!window.google || !window.google.maps) {
      // Create script element to load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC6k680hSHNQB2QABFuwe4MyisofNSZIc4&libraries=places`;
      script.async = true;
      script.defer = true;
      
      // Set up onload handler
      script.onload = () => {
        initGoogleMapsServices();
        initMap();
      };
      
      // Add script to document head
      document.head.appendChild(script);
      
      // Handle script loading errors
      script.onerror = () => {
        setError('Failed to load Google Maps API. Please check your internet connection and try again.');
      };
    } else {
      // Google Maps already loaded
      initGoogleMapsServices();
      initMap();
    }

    // Cleanup function
    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [initMap]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">College Search</h1>
          <Button 
            onClick={downloadAictePdf}
            variant="default" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
          >
            <Download className="h-5 w-5" />
            Download AICTE Approved Colleges List
          </Button>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for colleges..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* College List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Colleges</CardTitle>
                <CardDescription>
                  {colleges.length > 0 
                    ? `${colleges.length} colleges found` 
                    : 'Search for colleges to see results'}
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto">
                {colleges.length > 0 ? (
                  <div className="space-y-4">
                    {colleges.map((college) => (
                      <div
                        key={college.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedCollege?.id === college.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedCollege(college);
                          if (mapInstance.current) {
                            mapInstance.current.panTo(college.location);
                            mapInstance.current.setZoom(15);
                          }
                        }}
                      >
                        <h3 className="font-medium">{college.name}</h3>
                        <p className="text-sm text-gray-500">{college.formatted_address || college.address}</p>
                        {college.rating && (
                          <div className="mt-1 flex items-center">
                            <span className="text-yellow-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>
                                  {i < Math.floor(college.rating!) ? '★' : '☆'}
                                </span>
                              ))}
                            </span>
                            <span className="ml-1 text-xs text-gray-500">
                              ({college.rating.toFixed(1)})
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Info className="mx-auto h-8 w-8 mb-2" />
                    <p>Search for colleges to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map and College Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Map or Street View */}
            <div className="h-96 rounded-lg overflow-hidden border relative">
              {showStreetView ? (
                <div ref={streetViewRef} className="w-full h-full" />
              ) : (
                <div ref={mapRef} className="w-full h-full" />
              )}
              
              {/* Street View Toggle Button */}
              <Button 
                onClick={toggleStreetView}
                className="absolute bottom-4 right-4 z-10 bg-white text-black hover:bg-gray-100"
                variant="outline"
                size="sm"
              >
                <Eye className="mr-2 h-4 w-4" />
                {showStreetView ? 'Show Map' : 'Street View'}
              </Button>
            </div>

            {/* College Details */}
            {selectedCollege && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{selectedCollege.name}</CardTitle>
                  <CardDescription>
                    {selectedCollege.formatted_address || selectedCollege.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCollege.rating && (
                    <div>
                      <h3 className="font-medium">Rating</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(selectedCollege.rating!) ? '★' : '☆'}
                            </span>
                          ))}
                        </span>
                        <span className="ml-2 text-gray-600">
                          {selectedCollege.rating.toFixed(1)} out of 5
                          {selectedCollege.reviews && ` (${selectedCollege.reviews.length} reviews)`}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedCollege.website && (
                    <div>
                      <h3 className="font-medium">Website</h3>
                      <a
                        href={selectedCollege.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {selectedCollege.website.replace(/^https?:\/\//, '')}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {selectedCollege.types && selectedCollege.types.length > 0 && (
                    <div>
                      <h3 className="font-medium">Categories</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCollege.types
                          .filter(type => !['point_of_interest', 'establishment'].includes(type))
                          .slice(0, 5)
                          .map((type, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                            >
                              {type.replace(/_/g, ' ')}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {selectedCollege.opening_hours?.weekday_text && (
                    <div>
                      <h3 className="font-medium">Opening Hours</h3>
                      <ul className="text-sm">
                        {selectedCollege.opening_hours.weekday_text.map((time, i) => (
                          <li key={i} className="flex">
                            <span className="w-24 font-medium">
                              {time.split(': ')[0]}
                            </span>
                            <span>{time.split(': ')[1]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
