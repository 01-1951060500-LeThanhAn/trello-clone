"use client";
import React, { useState } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import type { OrganizationMembershipResource } from "@clerk/types";
import { Invitation } from "@clerk/nextjs/server";

export default function Organization() {
  const {
    organization: currentOrganization,
    membership,
    isLoaded,
  } = useOrganization();

  if (!isLoaded || !currentOrganization) {
    return null;
  }

  const isAdmin = membership?.role === "admin";
  return (
    <>
      <h1>Organization: {currentOrganization.name}</h1>
      <MemberList />
      {isAdmin && <InvitationList />}
    </>
  );
}

function MemberList() {
  const { memberships, membership } = useOrganization({
    membershipList: {},
  });

  if (!memberships) {
    return null;
  }

  const isCurrentUserAdmin = membership?.role === "admin";

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {memberships.data &&
          memberships.data.map((m) => (
            <li key={m.id}>
              {m.publicUserData.firstName} {m.publicUserData.lastName} &lt;
              {m.publicUserData.identifier}&gt; :: {m.role}
              {isCurrentUserAdmin && <AdminControls membership={m} />}
            </li>
          ))}
      </ul>
    </div>
  );
}

function AdminControls({
  membership,
}: {
  membership: OrganizationMembershipResource;
}) {
  const [disabled, setDisabled] = useState(false);
  const { user } = useUser();

  if (membership.publicUserData.userId === user?.id) {
    return null;
  }

  const remove = async () => {
    setDisabled(true);
    await membership.destroy();
  };

  const changeRole = async (role: string) => {
    setDisabled(true);
    await membership.update({ role });
    setDisabled(false);
  };

  return (
    <>
      ::{" "}
      <button disabled={disabled} onClick={remove}>
        Remove member
      </button>{" "}
      {membership.role === "admin" ? (
        <button disabled={disabled} onClick={() => changeRole("basic_member")}>
          Change to member
        </button>
      ) : (
        <button disabled={disabled} onClick={() => changeRole("admin")}>
          Change to admin
        </button>
      )}
    </>
  );
}

function InvitationList() {
  const { invitations } = useOrganization();

  if (!invitations) {
    return null;
  }

  const revoke = async (inv: Invitation) => {
    await inv.revoked?.valueOf();
  };

  return (
    <div>
      <h2>Invite member</h2>
      <InviteMember />

      <ul>
        {invitations.data &&
          invitations.data.map((invitation: any) => (
            <li key={invitation.id}>
              <p>{invitation.emailAddress} </p>
              <button onClick={() => revoke(invitation)}>Revoke</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

function InviteMember() {
  const { organization } = useOrganization();
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState<"basic_member" | "admin">("basic_member");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    try {
      await organization?.inviteMember({ emailAddress, role });
      setEmailAddress("");
      setRole("basic_member");
      setDisabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Email address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <label>
        <input
          type="radio"
          checked={role === "admin"}
          onChange={() => {
            setRole("admin");
          }}
        />{" "}
        Admin
      </label>
      <label>
        <input
          type="radio"
          checked={role === "basic_member"}
          onChange={() => {
            setRole("basic_member");
          }}
        />{" "}
        Member
      </label>{" "}
      <button type="submit" disabled={disabled}>
        Invite
      </button>
    </form>
  );
}
