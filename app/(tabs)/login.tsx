// app/(tabs)/login.tsx
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth } from "../../src/firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Login</Text>
          <Text style={styles.headerSubtitle}>Access your account</Text>
        </View>
      </View>
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94A3B8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="#6366F1" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>New here? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.signupLink}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", paddingHorizontal: 24 },
  topSection: { flex: 0.35, justifyContent: "center" },
  header: { marginBottom: 20 },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#6366F1",
    marginBottom: 8,
  },
  headerSubtitle: { fontSize: 16, color: "#64748B", fontWeight: "500" },
  formSection: { flex: 0.45 },
  input: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    color: "#1E293B",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6366F1",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  error: {
    color: "#EF4444",
    marginBottom: 12,
    fontSize: 14,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
    paddingBottom: 20,
  },
  footerText: { color: "#64748B", fontSize: 14 },
  signupLink: { color: "#6366F1", fontWeight: "700", fontSize: 14 },
});
