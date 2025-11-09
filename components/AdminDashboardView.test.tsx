
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminDashboardView from './AdminDashboardView';
import { User, Shift, WebsiteContent, Role, ShiftStatus, UserType } from '../types';

const mockUsers: User[] = [
  { id: '1', name: 'Alice', userType: 'JobSeeker', role: Role.Barista, rating: 4, reviewCount: 10, email: 'a@a.com', avatar: '' },
  { id: '2', name: 'Bob', userType: 'JobSeeker', role: Role.Chef, rating: 4, reviewCount: 10, email: 'a@a.com', avatar: '' },
  { id: '3', name: 'Charlie', userType: 'Business', role: Role.Host, rating: 4, reviewCount: 10, email: 'a@a.com', avatar: '' },
];

const mockShifts: Shift[] = [];
const mockWebsiteContent: WebsiteContent = {
  hero: { title: '', subtitle: '' },
  valueProps: {
    jobSeeker: { title: '', subtitle: '', description: '', benefits: [] },
    business: { title: '', subtitle: '', description: '', benefits: [] },
  },
  appDownload: { title: '', subtitle: '' },
};
const mockNotificationSettings = { emailOnProfileUpdate: true, emailOnApplicationStatusChange: true };

describe('AdminDashboardView', () => {
  it('displays the correct number of job seekers in the "Total Users" stat card', () => {
    render(
      <AdminDashboardView
        users={mockUsers}
        shifts={mockShifts}
        websiteContent={mockWebsiteContent}
        notificationSettings={mockNotificationSettings}
        onUpdateUser={() => {}}
        onDeleteUser={() => {}}
        onDeleteShift={() => {}}
        onEditUser={() => {}}
        onContentChange={() => {}}
        onNotificationSettingsChange={() => {}}
      />
    );

    const totalUsersCard = screen.getByText('Total Users').nextElementSibling;
    expect(totalUsersCard).toHaveTextContent('2');
  });
});
