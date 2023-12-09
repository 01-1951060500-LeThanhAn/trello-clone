"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrganization } from "@clerk/nextjs";
import { Invitation } from "@clerk/nextjs/server";
import { useState } from "react";

interface InviteProps {
  invitations: Record<string, Invitation>;
}
function InviteMember() {
  const { organization } = useOrganization();

  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState<"basic_member" | "admin">("basic_member");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setDisabled(true);
      await organization?.inviteMember({ emailAddress, role });
      console.log("Invite success");
      setEmailAddress("");
      setRole("basic_member");
      setDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Email address"
        className="w-full"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <label>
        <input
          className="mt-5"
          type="radio"
          checked={role === "admin"}
          onChange={() => {
            setRole("admin");
          }}
          disabled={disabled}
        />{" "}
        Admin
      </label>
      <label>
        <input
          className="mt-5 ml-3"
          type="radio"
          checked={role === "basic_member"}
          onChange={() => {
            setRole("basic_member");
          }}
          disabled={disabled}
        />{" "}
        Member
      </label>{" "}
      <Button
        variant="primary"
        className="ml-4"
        type="submit"
        disabled={disabled}
      >
        Invite
      </Button>
    </form>
  );
}

export default function InvitationList() {
  const { invitations } = useOrganization<InviteProps>({ invitations: {} });

  if (!invitations) {
    return null;
  }

  const revoke = async (inv: Invitation) => {
    await inv.revoked?.valueOf();
  };

  return (
    <div>
      <InviteMember />
      <div>
        {invitations.data &&
          invitations.data.map((invitation: any) => (
            <li key={invitation.id}>
              <p>{invitation.emailAddress} </p>
              <button onClick={() => revoke(invitation)}>Revoke</button>
            </li>
          ))}
      </div>
    </div>
  );
}
