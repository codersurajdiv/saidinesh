import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ProfileInfo,
  Publication,
  ResearchInterest,
  SocialLinks,
  TeachingExperience,
} from "../backend";
import { useActor } from "./useActor";

export function useProfileInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ProfileInfo>({
    queryKey: ["profileInfo"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getProfileInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePublications() {
  const { actor, isFetching } = useActor();
  return useQuery<Publication[]>({
    queryKey: ["publications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useResearchInterests() {
  const { actor, isFetching } = useActor();
  return useQuery<ResearchInterest[]>({
    queryKey: ["researchInterests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResearchInterests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTeachingExperience() {
  const { actor, isFetching } = useActor();
  return useQuery<TeachingExperience[]>({
    queryKey: ["teachingExperience"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeachingExperience();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSocialLinks() {
  const { actor, isFetching } = useActor();
  return useQuery<SocialLinks>({
    queryKey: ["socialLinks"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getSocialLinks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (profile: ProfileInfo) => {
      if (!actor) throw new Error("No actor");
      return actor.updateProfileInfo(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profileInfo"] }),
  });
}

export function useUpdateSocialLinks() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (links: SocialLinks) => {
      if (!actor) throw new Error("No actor");
      return actor.updateSocialLinks(links);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["socialLinks"] }),
  });
}

export function useAddOrUpdatePublication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (pub: Publication) => {
      if (!actor) throw new Error("No actor");
      return actor.addOrUpdatePublication(pub);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["publications"] }),
  });
}

export function useRemovePublication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => {
      if (!actor) throw new Error("No actor");
      return actor.removePublication(title);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["publications"] }),
  });
}

export function useAddOrUpdateResearchInterest() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (interest: ResearchInterest) => {
      if (!actor) throw new Error("No actor");
      return actor.addOrUpdateResearchInterest(interest);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["researchInterests"] }),
  });
}

export function useRemoveResearchInterest() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => {
      if (!actor) throw new Error("No actor");
      return actor.removeResearchInterest(title);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["researchInterests"] }),
  });
}

export function useAddOrUpdateTeachingExperience() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (exp: TeachingExperience) => {
      if (!actor) throw new Error("No actor");
      return actor.addOrUpdateTeachingExperience(exp);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachingExperience"] }),
  });
}

export function useRemoveTeachingExperience() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (courseName: string) => {
      if (!actor) throw new Error("No actor");
      return actor.removeTeachingExperience(courseName);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachingExperience"] }),
  });
}
