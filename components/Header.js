import React from "react";
import Link from "next/link";

const nfaDependencyVersion =
  require("../package.json").dependencies["next-firebase-auth"];
const nextDependencyVersion = require("../package.json").dependencies.next;
const firebaseDependencyVersion =
  require("../package.json").dependencies.firebase;
const firebaseAdminDependencyVersion =
  require("../package.json").dependencies["firebase-admin"];

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 16,
  },
  versionsContainer: {
    marginLeft: 0,
    marginRight: "auto",
  },
  button: {
    marginLeft: 16,
    cursor: "pointer",
  },
  nfaVersion: {
    fontWeight: "600",
  },
  loginContainer: {
    display: "flex",
    alignItems: "center",
  },
};

const Header = ({ email, signOut }) => (
  <div style={styles.container}>
    <div style={styles.versionsContainer}>
      <div style={styles.nfaVersion}>Version {nfaDependencyVersion}</div>
      <div>Next.js {nextDependencyVersion}</div>
      <div>Firebase {firebaseDependencyVersion}</div>
      <div>firebase-admin {firebaseAdminDependencyVersion}</div>
    </div>
    <div className="d-flex align-items-center">
      {email ? (
        <>
          <p className="m-0 fs-4 me-4">
            Signed in as <b>{email}</b>
          </p>
          <button
            className="btn btn-danger m-0 btn-block"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p className="m-0 fs-4 me-4">You are not signed in.</p>
          <div>
            <Link href="/auth">
              <a>
                <button type="button" className="btn btn-info m-0 btn-block">
                  Sign in
                </button>
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
);

export default Header;
