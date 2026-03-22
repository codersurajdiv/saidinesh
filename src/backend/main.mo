import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Mix in prefabricated authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ProfileInfo = {
    name : Text;
    title : Text;
    affiliation : Text;
    bio : Text;
    photoUrl : Text;
    email : Text;
    office : Text;
  };

  type ResearchInterest = {
    title : Text;
    description : Text;
  };

  module ResearchInterest {
    public func compare(interest1 : ResearchInterest, interest2 : ResearchInterest) : Order.Order {
      Text.compare(interest1.title, interest2.title);
    };
  };

  type Publication = {
    title : Text;
    authors : Text;
    year : Nat;
    venue : Text;
    abstract : Text;
    pdfUrl : Text;
    doi : Text;
  };

  module Publication {
    public func compare(pub1 : Publication, pub2 : Publication) : Order.Order {
      Text.compare(pub1.title, pub2.title);
    };
  };

  type TeachingExperience = {
    courseName : Text;
    courseCode : Text;
    semester : Text;
    year : Nat;
    role : Text;
  };

  module TeachingExperience {
    public func compare(te1 : TeachingExperience, te2 : TeachingExperience) : Order.Order {
      Text.compare(te1.courseName, te2.courseName);
    };
  };

  type SocialLinks = {
    googleScholar : Text;
    linkedIn : Text;
    github : Text;
    cvUrl : Text;
  };

  // State
  var profileInfo : ProfileInfo = {
    name = "Dr. Ada Lovelace";
    title = "PhD Candidate in Computer Science";
    affiliation = "Programming Langauge Research Group, ACME University";
    bio = "I am a PhD student specializing in programming language design and verification. My work focuses on formal methods, type systems, and applications of category theory to compiler optimizations. I am passionate about making software more reliable, predictable, and maintainable through advanced language features and tooling.";
    photoUrl = "https://example.com/ada-lovelace.png";
    email = "adalovelace@acme.edu";
    office = "Room 421, Turing Building";
  };

  let researchInterests = Map.empty<Text, ResearchInterest>();
  let publications = Map.empty<Text, Publication>();
  let teachingExperience = Map.empty<Text, TeachingExperience>();

  // Pre-populate research interests
  researchInterests.add(
    "type-systems",
    {
      title = "Type Systems";
      description = "Design and implementation of advanced type systems for programming languages, including dependent types, linear types, and gradual typing.";
    },
  );
  researchInterests.add(
    "formal-verification",
    {
      title = "Formal Verification";
      description = "Applying formal methods such as theorem proving, model checking, and symbolic execution to verify the correctness of software systems.";
    },
  );
  researchInterests.add(
    "category-theory",
    {
      title = "Category Theory in PL";
      description = "Exploring the use of category theory concepts like functors, monads, and algebraic structures in programming language design and compiler construction.";
    },
  );

  publications.add(
    "formal-verification-languages",
    {
      title = "Bridging Formal Verification and Type Systems";
      authors = "A. Lovelace, B. Pascal";
      year = 2022;
      venue = "Journal of Programming Languages";
      abstract = "This paper presents a novel approach to integrating formal verification techniques directly into programming language type systems, allowing for static verification of program properties at compile-time. We introduce a new language called Verity, which leverages dependent types and refinement types to bridge the gap between traditional formal methods and modern type systems. Empirical evaluation demonstrates significant improvements in safety and reliability metrics across a range of case studies.";
      pdfUrl = "https://example.com/verity.pdf";
      doi = "10.1000/verity.2022";
    },
  );
  publications.add(
    "category-theory-compiler",
    {
      title = "Category Theory Techniques for Compiler Optimization";
      authors = "A. Lovelace, C. LaPlace";
      year = 2023;
      venue = "Conference on Compiler Construction";
      abstract = "We propose an innovative application of category theory concepts, including functors, monoids, and functional graphs, to automatically generate and optimize compiler intermediate representations. Our approach enables more modular and reusable optimization passes, reducing compilation time and improving the maintainability of compiler codebases. Experimental results show a 15% decrease in overall compilation time when using our optimized compiler compared to traditional approaches.";
      pdfUrl = "https://example.com/category-theory-compiler.pdf";
      doi = "10.1000/comp.2023";
    },
  );

  teachingExperience.add(
    "pl-course-ta",
    {
      courseName = "Advanced Programming Languages";
      courseCode = "CS520";
      semester = "Fall";
      year = 2021;
      role = "Teaching Assistant - Led weekly discussion sections and helped develop course materials for a graduate-level class focusing on static semantics and advanced typetheoretic approaches in language design.";
    },
  );
  teachingExperience.add(
    "pl-course-ta",
    {
      courseName = "Introduction to Formal Methods";
      courseCode = "CS301";
      semester = "Spring";
      year = 2022;
      role = "Grader/TA - Assisted with grading, held office hours, and provided extra tutorials on theorem proving and model checking techniques for an undergraduate class.";
    },
  );

  var socialLinks : SocialLinks = {
    googleScholar = "https://scholar.google.com/adalovelace";
    linkedIn = "https://linkedin.com/in/ada-lovelace";
    github = "https://github.com/adalovelace";
    cvUrl = "https://example.com/ada-lovelace-cv.pdf";
  };

  // Public query functions

  public query func getProfileInfo() : async ProfileInfo {
    profileInfo;
  };

  public query func getResearchInterests() : async [ResearchInterest] {
    researchInterests.values().toArray().sort();
  };

  public query func getPublications() : async [Publication] {
    publications.values().toArray().sort();
  };

  public query func getTeachingExperience() : async [TeachingExperience] {
    teachingExperience.values().toArray().sort();
  };

  public query func getSocialLinks() : async SocialLinks {
    socialLinks;
  };

  // Admin update functions

  public shared ({ caller }) func updateProfileInfo(newProfile : ProfileInfo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update profile info");
    };
    profileInfo := newProfile;
  };

  public shared ({ caller }) func addOrUpdateResearchInterest(interest : ResearchInterest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update research interests");
    };
    researchInterests.add(interest.title, interest);
  };

  public shared ({ caller }) func removeResearchInterest(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove research interests");
    };
    researchInterests.remove(title);
  };

  public shared ({ caller }) func addOrUpdatePublication(publication : Publication) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update publications");
    };
    publications.add(publication.title, publication);
  };

  public shared ({ caller }) func removePublication(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove publications");
    };
    publications.remove(title);
  };

  public shared ({ caller }) func addOrUpdateTeachingExperience(teaching : TeachingExperience) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update teaching experience");
    };
    teachingExperience.add(teaching.courseName, teaching);
  };

  public shared ({ caller }) func removeTeachingExperience(courseName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove teaching experience");
    };
    teachingExperience.remove(courseName);
  };

  public shared ({ caller }) func updateSocialLinks(newLinks : SocialLinks) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update social links");
    };
    socialLinks := newLinks;
  };
};
