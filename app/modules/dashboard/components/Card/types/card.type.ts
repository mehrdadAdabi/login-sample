export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  description: string | null;
  address: string | null;
  imageURL: string;
}

export interface Speciality {
  id: number;
  name: string;
  slug: string;
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Job {
  item: {
    category: Category;
    company: Company;
    country: string;
    datePosted: Date;
    employmentType: string;
    expirationDate: string;
    featured: boolean;
    id: number;
    jobType: string;
    location: string;
    positionLevel: string;
    shares: number;
    speciality: Speciality;
    subCategory: SubCategory;
    title: string;
    views: number;
  };
}
