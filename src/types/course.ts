import { NearbyFilter } from './nearby-filter';

export type Point = {
  lat: number;
  lng: number;
  name: string;
  address: string;
};

export type CourseType = {
  id: string;
  name: string;
  difficulty: 'easy' | 'normal' | 'hard';
  startPoint: Point;
  endPoint: Point;
  distance: number;
  duration: string;
  ratingAverage: string;
};

export type Course = {
  title: string;
  difficulty: string;
  time: string;
  distance: string;
  image: string;
};

export type DifficultyString = 'None' | 'Easy' | 'Moderate' | 'Hard';
export type DifficultyNumber = 0 | 1 | 2 | 3;

export type CourseDTO = {
  id: number;
  courseName: string;
  distance: number;
  startPointName: string;
  endPointName: string;
  difficulty: DifficultyString;
  ratingAverage: number;
  duration: string;
  imgUrl: string;
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type PointDTO = {
  name: string;
  address: string;
  coordinate: Coordinate;
};

export type NearbyPoint = PointDTO & {
  id: string;
  filterName: NearbyFilter;
};

export type MapCourseDTO = Omit<
  CourseDTO,
  'startPointName' | 'endPointName' | 'imgUrl'
> & {
  startPoint: PointDTO;
  midPoint: Coordinate;
  endPoint: PointDTO;
  gpxUrl: string;
};

export type CourseDetailDTO = Omit<MapCourseDTO, 'midPoint'> &
  Pick<CourseDTO, 'imgUrl'>;

export type CourseNameDTO = {
  id: number;
  name: string;
};
