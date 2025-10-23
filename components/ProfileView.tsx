import React from 'react';
import { User, Experience, Review as ReviewType } from '../types';
import { StarIcon, LocationIcon, BriefcaseIcon, PencilIcon, VerificationIcon } from './Icons';

interface ProfileViewProps {
  user: User;
}

const ProfileHeader: React.FC<{ user: User }> = ({ user }) => (
  <div className="bg-white p-6 md:p-8 rounded-t-lg shadow-md">
    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
      <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg -mt-16 md:-mt-20" />
      <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
                <h2 className="text-3xl font-bold text-primary">{user.name}</h2>
                <p className="text-slate-600 text-lg font-medium">{user.role}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                    <div className="flex items-center text-amber-500">
                        <StarIcon className="w-5 h-5" />
                        <span className="font-bold text-md ml-1">{user.rating.toFixed(1)}</span>
                        <span className="text-slate-500 text-sm ml-1.5">({user.reviewCount} reviews)</span>
                    </div>
                    {user.location && (
                        <div className="flex items-center text-slate-500">
                            <span className="mx-1">&bull;</span>
                            <LocationIcon className="w-4 h-4 mr-1" />
                            <span>{user.location}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button className="bg-accent text-white font-bold py-2 px-4 rounded-full hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 w-full">
                    Contact
                </button>
                <button className="bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-full hover:bg-slate-300 transition-colors flex items-center justify-center gap-2 w-full">
                    <PencilIcon className="w-4 h-4" />
                    Edit Profile
                </button>
            </div>
        </div>
      </div>
    </div>
  </div>
);

const AboutSection: React.FC<{ bio?: string }> = ({ bio }) => (
  bio ? (
    <div className="p-6">
      <h3 className="text-xl font-bold text-primary mb-3">About Me</h3>
      <p className="text-slate-700 leading-relaxed">{bio}</p>
    </div>
  ) : null
);

const ExperienceItem: React.FC<{ item: Experience }> = ({ item }) => (
  <div className="flex gap-4">
    <div className="mt-1">
        <span className="bg-slate-100 p-3 rounded-full flex items-center justify-center">
            <BriefcaseIcon className="w-5 h-5 text-slate-500" />
        </span>
    </div>
    <div>
        <p className="font-bold text-primary">{item.position}</p>
        <p className="text-slate-600">{item.place} &bull; {item.location}</p>
        <p className="text-sm text-slate-500">{item.startDate} - {item.endDate}</p>
    </div>
  </div>
);

const ExperienceSection: React.FC<{ experience?: Experience[] }> = ({ experience }) => (
  experience && experience.length > 0 ? (
    <div className="p-6">
      <h3 className="text-xl font-bold text-primary mb-4">Work Experience</h3>
      <div className="space-y-6">
        {experience.map(item => <ExperienceItem key={item.id} item={item} />)}
      </div>
    </div>
  ) : null
);

const Review: React.FC<{ review: ReviewType }> = ({ review }) => (
    <div className="flex gap-4">
        <img src={review.reviewerAvatar} alt={review.reviewerName} className="w-12 h-12 rounded-full" />
        <div className="flex-grow">
            <div className="flex justify-between items-center">
                <p className="font-bold text-primary">{review.reviewerName}</p>
                <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-slate-300'}`} />
                    ))}
                </div>
            </div>
            <p className="text-sm text-slate-500 mb-2">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-slate-700">{review.comment}</p>
        </div>
    </div>
);

const ReviewsSection: React.FC<{ reviews?: ReviewType[] }> = ({ reviews }) => (
    reviews && reviews.length > 0 ? (
    <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-4">Reviews</h3>
        <div className="space-y-6">
            {reviews.map(review => <Review key={review.id} review={review} />)}
        </div>
    </div>
  ) : null
);

const SidebarSection: React.FC<{ title: string; items?: string[] }> = ({ title, items }) => (
    items && items.length > 0 ? (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
            {items.map(item => (
                <span key={item} className="bg-cyan-100 text-cyan-800 text-sm font-medium px-3 py-1 rounded-full">{item}</span>
            ))}
        </div>
    </div>
  ) : null
);

const VerificationSection: React.FC = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-primary mb-4">Verifications</h3>
        <ul className="space-y-2">
            <li className="flex items-center gap-2 text-green-600 font-medium">
                <VerificationIcon className="w-5 h-5" /> ID Verified
            </li>
            <li className="flex items-center gap-2 text-green-600 font-medium">
                <VerificationIcon className="w-5 h-5" /> Payment Method Verified
            </li>
        </ul>
    </div>
);


const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <ProfileHeader user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <main className="lg:col-span-2 bg-white rounded-b-lg shadow-md divide-y divide-slate-200">
                <AboutSection bio={user.bio} />
                <ExperienceSection experience={user.experience} />
                <ReviewsSection reviews={user.reviews} />
            </main>
            <aside className="space-y-8">
                <SidebarSection title="Skills" items={user.skills} />
                <VerificationSection />
            </aside>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;