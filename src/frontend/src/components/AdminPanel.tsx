import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogIn, LogOut, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type {
  Publication,
  ResearchInterest,
  TeachingExperience,
} from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddOrUpdatePublication,
  useAddOrUpdateResearchInterest,
  useAddOrUpdateTeachingExperience,
  useIsAdmin,
  useProfileInfo,
  usePublications,
  useRemovePublication,
  useRemoveResearchInterest,
  useRemoveTeachingExperience,
  useResearchInterests,
  useSocialLinks,
  useTeachingExperience,
  useUpdateProfile,
  useUpdateSocialLinks,
} from "../hooks/useQueries";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

function LoginScreen() {
  const { login, isLoggingIn } = useInternetIdentity();
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-lg">Admin Login</h3>
        <p className="text-muted-foreground text-sm">
          Sign in to update your website content.
        </p>
      </div>
      <Button
        onClick={login}
        disabled={isLoggingIn}
        data-ocid="admin.login.button"
      >
        {isLoggingIn ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        {isLoggingIn ? "Signing in..." : "Sign In"}
      </Button>
    </div>
  );
}

function ProfileTab() {
  const { data: profile } = useProfileInfo();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const [form, setForm] = useState<Partial<typeof profile>>({});

  const current = { ...profile, ...form };

  const handleSave = async () => {
    if (
      !current.name ||
      !current.title ||
      !current.affiliation ||
      !current.bio ||
      !current.email ||
      !current.office
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    await updateProfile({
      name: current.name,
      title: current.title,
      affiliation: current.affiliation,
      bio: current.bio,
      email: current.email,
      office: current.office,
      photoUrl: current.photoUrl ?? "",
    });
    toast.success("Profile updated");
    setForm({});
  };

  const field = (
    key: keyof NonNullable<typeof profile>,
    label: string,
    multiline = false,
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>{label}</Label>
      {multiline ? (
        <Textarea
          id={key}
          value={String(current?.[key] ?? "")}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [key]: e.target.value }))
          }
          rows={3}
          data-ocid={`admin.profile.${key}.textarea`}
        />
      ) : (
        <Input
          id={key}
          value={String(current?.[key] ?? "")}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [key]: e.target.value }))
          }
          data-ocid={`admin.profile.${key}.input`}
        />
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {field("name", "Name")}
      {field("title", "Title")}
      {field("affiliation", "Affiliation")}
      {field("bio", "Bio", true)}
      {field("email", "Email")}
      {field("office", "Office")}
      {field("photoUrl", "Photo URL")}
      <Button
        onClick={handleSave}
        disabled={isPending}
        data-ocid="admin.profile.save_button"
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Profile
      </Button>
    </div>
  );
}

function SocialLinksTab() {
  const { data: links } = useSocialLinks();
  const { mutateAsync: updateLinks, isPending } = useUpdateSocialLinks();
  const [form, setForm] = useState<Partial<typeof links>>({});

  const current = { ...links, ...form };

  const handleSave = async () => {
    await updateLinks({
      googleScholar: current.googleScholar ?? "",
      linkedIn: current.linkedIn ?? "",
      github: current.github ?? "",
      cvUrl: current.cvUrl ?? "",
    });
    toast.success("Social links updated");
    setForm({});
  };

  const field = (key: keyof NonNullable<typeof links>, label: string) => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        value={String(current?.[key] ?? "")}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, [key]: e.target.value }))
        }
        placeholder="https://..."
        data-ocid={`admin.social.${key}.input`}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      {field("googleScholar", "Google Scholar URL")}
      {field("linkedIn", "LinkedIn URL")}
      {field("github", "GitHub URL")}
      {field("cvUrl", "CV URL")}
      <Button
        onClick={handleSave}
        disabled={isPending}
        data-ocid="admin.social.save_button"
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Links
      </Button>
    </div>
  );
}

function PublicationsTab() {
  const { data: publications } = usePublications();
  const { mutateAsync: addPub, isPending: adding } =
    useAddOrUpdatePublication();
  const { mutateAsync: removePub } = useRemovePublication();
  const [form, setForm] = useState<Partial<Publication>>({
    title: "",
    authors: "",
    venue: "",
    year: BigInt(new Date().getFullYear()),
    abstract: "",
    pdfUrl: "",
    doi: "",
  });

  const handleAdd = async () => {
    if (!form.title || !form.authors || !form.venue) {
      toast.error("Title, authors, and venue are required");
      return;
    }
    await addPub({
      title: form.title ?? "",
      authors: form.authors ?? "",
      venue: form.venue ?? "",
      year: BigInt(form.year ?? new Date().getFullYear()),
      abstract: form.abstract ?? "",
      pdfUrl: form.pdfUrl ?? "",
      doi: form.doi ?? "",
    });
    toast.success("Publication added");
    setForm({
      title: "",
      authors: "",
      venue: "",
      year: BigInt(new Date().getFullYear()),
      abstract: "",
      pdfUrl: "",
      doi: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 border border-border rounded-lg p-4">
        <p className="text-sm font-semibold">Add / Update Publication</p>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          data-ocid="admin.pub.title.input"
        />
        <Input
          placeholder="Authors"
          value={form.authors}
          onChange={(e) => setForm((p) => ({ ...p, authors: e.target.value }))}
          data-ocid="admin.pub.authors.input"
        />
        <Input
          placeholder="Venue / Journal"
          value={form.venue}
          onChange={(e) => setForm((p) => ({ ...p, venue: e.target.value }))}
          data-ocid="admin.pub.venue.input"
        />
        <Input
          placeholder="Year"
          type="number"
          value={String(form.year ?? "")}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              year: BigInt(e.target.value || new Date().getFullYear()),
            }))
          }
          data-ocid="admin.pub.year.input"
        />
        <Input
          placeholder="PDF URL"
          value={form.pdfUrl}
          onChange={(e) => setForm((p) => ({ ...p, pdfUrl: e.target.value }))}
          data-ocid="admin.pub.pdf.input"
        />
        <Input
          placeholder="DOI"
          value={form.doi}
          onChange={(e) => setForm((p) => ({ ...p, doi: e.target.value }))}
          data-ocid="admin.pub.doi.input"
        />
        <Textarea
          placeholder="Abstract"
          rows={2}
          value={form.abstract}
          onChange={(e) => setForm((p) => ({ ...p, abstract: e.target.value }))}
          data-ocid="admin.pub.abstract.textarea"
        />
        <Button
          onClick={handleAdd}
          disabled={adding}
          size="sm"
          data-ocid="admin.pub.add_button"
        >
          {adding ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Plus className="mr-1 h-3 w-3" />
          )}
          Add Publication
        </Button>
      </div>
      <Separator />
      <div className="space-y-2">
        {(publications ?? []).map((pub, i) => (
          <div
            key={pub.title}
            className="flex items-start justify-between gap-3 py-2"
            data-ocid={`admin.pub.item.${i + 1}`}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{pub.title}</p>
              <p className="text-xs text-muted-foreground">
                {String(pub.year)} · {pub.venue}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive flex-shrink-0"
              onClick={() =>
                removePub(pub.title).then(() => toast.success("Removed"))
              }
              data-ocid={`admin.pub.delete_button.${i + 1}`}
            >
              <Trash2 size={13} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchTab() {
  const { data: interests } = useResearchInterests();
  const { mutateAsync: addInterest, isPending: adding } =
    useAddOrUpdateResearchInterest();
  const { mutateAsync: removeInterest } = useRemoveResearchInterest();
  const [form, setForm] = useState<ResearchInterest>({
    title: "",
    description: "",
  });

  const handleAdd = async () => {
    if (!form.title || !form.description) {
      toast.error("Both fields required");
      return;
    }
    await addInterest(form);
    toast.success("Research interest saved");
    setForm({ title: "", description: "" });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 border border-border rounded-lg p-4">
        <p className="text-sm font-semibold">Add / Update Research Interest</p>
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          data-ocid="admin.research.title.input"
        />
        <Textarea
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          data-ocid="admin.research.description.textarea"
        />
        <Button
          onClick={handleAdd}
          disabled={adding}
          size="sm"
          data-ocid="admin.research.add_button"
        >
          {adding ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Plus className="mr-1 h-3 w-3" />
          )}
          Add Interest
        </Button>
      </div>
      <Separator />
      <div className="space-y-2">
        {(interests ?? []).map((item, i) => (
          <div
            key={item.title}
            className="flex items-start justify-between gap-3 py-2"
            data-ocid={`admin.research.item.${i + 1}`}
          >
            <div>
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {item.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive flex-shrink-0"
              onClick={() =>
                removeInterest(item.title).then(() => toast.success("Removed"))
              }
              data-ocid={`admin.research.delete_button.${i + 1}`}
            >
              <Trash2 size={13} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeachingTab() {
  const { data: courses } = useTeachingExperience();
  const { mutateAsync: addCourse, isPending: adding } =
    useAddOrUpdateTeachingExperience();
  const { mutateAsync: removeCourse } = useRemoveTeachingExperience();
  const [form, setForm] = useState<Partial<TeachingExperience>>({
    courseName: "",
    courseCode: "",
    semester: "",
    year: BigInt(new Date().getFullYear()),
    role: "",
  });

  const handleAdd = async () => {
    if (!form.courseName || !form.courseCode || !form.semester || !form.role) {
      toast.error("All fields required");
      return;
    }
    await addCourse({
      courseName: form.courseName ?? "",
      courseCode: form.courseCode ?? "",
      semester: form.semester ?? "",
      year: BigInt(form.year ?? new Date().getFullYear()),
      role: form.role ?? "",
    });
    toast.success("Teaching experience added");
    setForm({
      courseName: "",
      courseCode: "",
      semester: "",
      year: BigInt(new Date().getFullYear()),
      role: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 border border-border rounded-lg p-4">
        <p className="text-sm font-semibold">Add / Update Course</p>
        <Input
          placeholder="Course Name"
          value={form.courseName}
          onChange={(e) =>
            setForm((p) => ({ ...p, courseName: e.target.value }))
          }
          data-ocid="admin.teaching.name.input"
        />
        <Input
          placeholder="Course Code"
          value={form.courseCode}
          onChange={(e) =>
            setForm((p) => ({ ...p, courseCode: e.target.value }))
          }
          data-ocid="admin.teaching.code.input"
        />
        <Input
          placeholder="Semester (e.g. Spring)"
          value={form.semester}
          onChange={(e) => setForm((p) => ({ ...p, semester: e.target.value }))}
          data-ocid="admin.teaching.semester.input"
        />
        <Input
          placeholder="Year"
          type="number"
          value={String(form.year ?? "")}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              year: BigInt(e.target.value || new Date().getFullYear()),
            }))
          }
          data-ocid="admin.teaching.year.input"
        />
        <Textarea
          placeholder="Role / Description"
          rows={2}
          value={form.role}
          onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
          data-ocid="admin.teaching.role.textarea"
        />
        <Button
          onClick={handleAdd}
          disabled={adding}
          size="sm"
          data-ocid="admin.teaching.add_button"
        >
          {adding ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Plus className="mr-1 h-3 w-3" />
          )}
          Add Course
        </Button>
      </div>
      <Separator />
      <div className="space-y-2">
        {(courses ?? []).map((course, i) => (
          <div
            key={course.courseName}
            className="flex items-start justify-between gap-3 py-2"
            data-ocid={`admin.teaching.item.${i + 1}`}
          >
            <div>
              <p className="text-sm font-medium">
                {course.courseCode}: {course.courseName}
              </p>
              <p className="text-xs text-muted-foreground">
                {course.semester} {String(course.year)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive flex-shrink-0"
              onClick={() =>
                removeCourse(course.courseName).then(() =>
                  toast.success("Removed"),
                )
              }
              data-ocid={`admin.teaching.delete_button.${i + 1}`}
            >
              <Trash2 size={13} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel({ open, onClose }: AdminPanelProps) {
  const { identity, clear } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const isLoggedIn = !!identity;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto"
        data-ocid="admin.sheet"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="font-serif">Website Admin</SheetTitle>
          <SheetDescription>
            {isLoggedIn
              ? "Update your academic website content below."
              : "Please sign in to manage your content."}
          </SheetDescription>
        </SheetHeader>

        {!isLoggedIn ? (
          <LoginScreen />
        ) : !isAdmin ? (
          <div className="py-8 text-center space-y-4">
            <p className="text-muted-foreground text-sm">
              You are logged in but don't have admin permissions.
            </p>
            <Button
              variant="outline"
              onClick={clear}
              data-ocid="admin.logout.button"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                data-ocid="admin.logout.button"
              >
                <LogOut className="mr-2 h-3 w-3" /> Sign Out
              </Button>
            </div>
            <Tabs defaultValue="profile">
              <TabsList
                className="w-full grid grid-cols-5 mb-6"
                data-ocid="admin.tabs"
              >
                <TabsTrigger value="profile" data-ocid="admin.profile.tab">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="research" data-ocid="admin.research.tab">
                  Research
                </TabsTrigger>
                <TabsTrigger
                  value="publications"
                  data-ocid="admin.publications.tab"
                >
                  Papers
                </TabsTrigger>
                <TabsTrigger value="teaching" data-ocid="admin.teaching.tab">
                  Teaching
                </TabsTrigger>
                <TabsTrigger value="social" data-ocid="admin.social.tab">
                  Links
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileTab />
              </TabsContent>
              <TabsContent value="research">
                <ResearchTab />
              </TabsContent>
              <TabsContent value="publications">
                <PublicationsTab />
              </TabsContent>
              <TabsContent value="teaching">
                <TeachingTab />
              </TabsContent>
              <TabsContent value="social">
                <SocialLinksTab />
              </TabsContent>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
