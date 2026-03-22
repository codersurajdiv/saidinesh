import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SocialLinks {
    linkedIn: string;
    cvUrl: string;
    googleScholar: string;
    github: string;
}
export interface Publication {
    doi: string;
    title: string;
    venue: string;
    year: bigint;
    authors: string;
    pdfUrl: string;
    abstract: string;
}
export interface TeachingExperience {
    semester: string;
    role: string;
    year: bigint;
    courseCode: string;
    courseName: string;
}
export interface ResearchInterest {
    title: string;
    description: string;
}
export interface ProfileInfo {
    bio: string;
    title: string;
    name: string;
    office: string;
    photoUrl: string;
    email: string;
    affiliation: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOrUpdatePublication(publication: Publication): Promise<void>;
    addOrUpdateResearchInterest(interest: ResearchInterest): Promise<void>;
    addOrUpdateTeachingExperience(teaching: TeachingExperience): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getProfileInfo(): Promise<ProfileInfo>;
    getPublications(): Promise<Array<Publication>>;
    getResearchInterests(): Promise<Array<ResearchInterest>>;
    getSocialLinks(): Promise<SocialLinks>;
    getTeachingExperience(): Promise<Array<TeachingExperience>>;
    isCallerAdmin(): Promise<boolean>;
    removePublication(title: string): Promise<void>;
    removeResearchInterest(title: string): Promise<void>;
    removeTeachingExperience(courseName: string): Promise<void>;
    updateProfileInfo(newProfile: ProfileInfo): Promise<void>;
    updateSocialLinks(newLinks: SocialLinks): Promise<void>;
}
