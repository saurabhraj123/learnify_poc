/** External */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDb } from "@/utils/db";

/** Internal */
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log({ user, account, profile });
      try {
        await connectDb();

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) return true;

        const newUser = new User({
          name: user.name,
          email: user.email,
          image: user.image,
        });
        await newUser.save();

        return true;
      } catch (error) {
        console.error("Error saving user:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
