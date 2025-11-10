import React, { useMemo } from 'react';
import { User, Experience, Review as ReviewType, Chat, Shift } from '../types';
import { StarIcon, LocationIcon, BriefcaseIcon, PencilIcon, VerificationIcon, LightBulbIcon, CheckCircleIcon } from './Icons';

interface ProfileViewProps {
  user: User;
  chats?: Chat[];
  shifts?: Shift[];
  allUsers?: User[];
  onOpenChat?: (chatId: string) => void;
}

const ProfileStrength: React.FC<{ score: number }> = ({ score }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-bold text-primary mb-4">Profile Strength</h3>
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                        className="text-slate-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                    />
                    <circle
                        className="text-accent"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        transform="rotate(-90 60 60)"
                        style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary">
                    {score}%
                </span>
            </div>
        </div>
    );
};

const ActionableTips: React.FC<{ user: User }> = ({ user }) => {
    const tips: { id: string; text: string }[] = [];
    if (!user.bio || user.bio.length < 50) {
        tips.push({ id: 'bio', text: "A detailed bio (50+ characters) increases your hiring chances by 40%." });
    }
    if (!user.skills || user.skills.length < 3) {
        tips.push({ id: 'skills', text: "Add at least 3 skills to get noticed by top businesses." });
    }
    if (!user.experience || user.experience.length < 1) {
        tips.push({ id: 'experience', text: "Showcase your history by adding at least one work experience." });
    }
    if (!user.location) {
        tips.push({ id: 'location', text: "Add your city to appear in location-based searches." });
    }

    if (tips.length === 0) return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-amber-400" />
                Profile Strength
            </h3>
            <div className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg">
                <CheckCircleIcon className="w-6 h-6"/>
                <p className="text-sm font-semibold">Your profile is looking great! You're all set to apply.</p>
            </div>
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-amber-400" />
                How to Improve
            </h3>
            <ul className="space-y-3">
                {tips.map((tip) => (
                    <li key={tip.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg transition-colors hover:bg-slate-100">
                        <div className="flex items-start pr-4">
                            <span className="text-accent mt-0.5">💡</span>
                            <span className="text-sm text-slate-700 ml-2">{tip.text}</span>
                        </div>
                        <button 
                            onClick={() => alert('This would take you to the profile edit screen.')}
                            className="text-xs font-bold text-accent hover:underline flex-shrink-0 whitespace-nowrap"
                        >
                            Improve &rarr;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


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

const AboutSection: React.FC<{ user: User }> = ({ user }) => (
  user.bio ? (
    <div className="p-6">
      <h3 className="text-xl font-bold text-primary mb-3">About {user.userType === 'JobSeeker' ? 'Me' : user.name}</h3>
      <p className="text-slate-700 leading-relaxed">{user.bio}</p>
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

const timeSince = (dateString: string): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 5) return "Just now";
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
};

const BusinessChatsList: React.FC<{
    businessId: string;
    chats: Chat[];
    shifts: Shift[];
    allUsers: User[];
    onOpenChat: (chatId: string) => void;
}> = ({ businessId, chats, shifts, allUsers, onOpenChat }) => {
    const businessChats = chats
        .filter(chat => chat.participants.businessId === businessId)
        .sort((a, b) => {
            const lastMessageA = a.messages[a.messages.length - 1];
            const lastMessageB = b.messages[b.messages.length - 1];
            if (!lastMessageA) return 1;
            if (!lastMessageB) return -1;
            return new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
        });

    const getJobSeeker = (chat: Chat): User | undefined => {
        return allUsers.find(u => u.id === chat.participants.userId);
    };

    return (
        <div className="bg-white rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-bold text-primary p-6 border-b border-slate-200">Conversations</h3>
            {businessChats.length > 0 ? (
                <ul className="divide-y divide-slate-200">
                    {businessChats.map(chat => {
                        const jobSeeker = getJobSeeker(chat);
                        const shift = shifts.find(s => s.id === chat.shiftId);
                        const lastMessage = chat.messages[chat.messages.length - 1];

                        if (!jobSeeker || !shift) return null;

                        return (
                            <li key={chat.id}>
                                <button onClick={() => onOpenChat(chat.id)} className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                                    <img src={jobSeeker.avatar} alt={jobSeeker.name} className="w-12 h-12 rounded-full flex-shrink-0" />
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex justify-between items-baseline">
                                            <p className="font-bold text-primary truncate">{jobSeeker.name}</p>
                                            {lastMessage && <p className="text-xs text-slate-500 flex-shrink-0">{timeSince(lastMessage.timestamp)}</p>}
                                        </div>
                                        <p className="text-sm text-slate-600 truncate">Re: {shift.role} at {shift.businessName}</p>
                                        {lastMessage ? (
                                            <p className="text-sm text-slate-500 truncate mt-1">
                                                {lastMessage.senderId === businessId ? "You: " : ""}
                                                {lastMessage.text}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-slate-500 italic mt-1">No messages yet.</p>
                                        )}
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="text-center p-12">
                    <p className="text-slate-500">This business has no active conversations.</p>
                </div>
            )}
        </div>
    );
};


const ProfileView: React.FC<ProfileViewProps> = ({ user, chats, shifts, allUsers, onOpenChat }) => {
  const profileStrengthScore = useMemo(() => {
    if (user.userType !== 'JobSeeker') return 0;
    let score = 0;
    if (user.bio && user.bio.length >= 50) score += 30;
    if (user.skills && user.skills.length >= 3) score += 30;
    if (user.experience && user.experience.length >= 1) score += 30;
    if (user.location) score += 10;
    return score;
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <ProfileHeader user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <main className="lg:col-span-2 bg-white rounded-b-lg shadow-md divide-y divide-slate-200">
                <AboutSection user={user} />
                {user.userType === 'JobSeeker' && <ExperienceSection experience={user.experience} />}
                <ReviewsSection reviews={user.reviews} />
            </main>
            <aside className="space-y-8">
                {user.userType === 'JobSeeker' && (
                  <>
                    <ProfileStrength score={profileStrengthScore} />
                    <ActionableTips user={user} />
                  </>
                )}
                {user.userType === 'JobSeeker' && <SidebarSection title="Skills" items={user.skills} />}
                <VerificationSection />
            </aside>
        </div>
        {user.userType === 'Business' && chats && shifts && allUsers && onOpenChat && (
            <BusinessChatsList
                businessId={user.id}
                chats={chats}
                shifts={shifts}
                allUsers={allUsers}
                onOpenChat={onOpenChat}
            />
        )}
      </div>
    </div>
  );
};

export default ProfileView;
