import { Page, Text, View, Document, StyleSheet, Font, Svg, Path } from "@react-pdf/renderer"

interface ContestResult {
    contestName: string
    participantName: string
    rank: number
    totalParticipants: number
    points: number
    problemsSolved: number
    totalTime: string
    date: string
}

interface CertificateProps {
    contestResult: ContestResult
}

// Register fonts
Font.register({
    family: "Inter",
    fonts: [
        {
            src: "/fonts/Inter-Regular.ttf", // No need for `window.location.origin`
            fontWeight: 400,
        },
        {
            src: "/fonts/Inter-Bold.ttf",
            fontWeight: 700,
        },
    ],
})


const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 40,
        position: "relative",
    },
    decorativeBorder: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        borderWidth: 3,
        borderColor: "#2563eb",
        borderStyle: "solid",
        borderRadius: 10,
    },
    innerBorder: {
        position: "absolute",
        top: 25,
        left: 25,
        right: 25,
        bottom: 25,
        borderWidth: 1,
        borderColor: "#93c5fd",
        borderStyle: "solid",
        borderRadius: 8,
    },
    header: {
        marginTop: 60,
        marginBottom: 30,
        alignItems: "center",
    },
    logo: {
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#1e3a8a",
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Inter",
        color: "#475569",
        marginBottom: 40,
        paddingHorizontal: 40,
    },
    participantSection: {
        marginBottom: 30,
        alignItems: "center",
    },
    presentedTo: {
        fontSize: 16,
        color: "#64748b",
        marginBottom: 10,
    },
    participantName: {
        fontSize: 32,
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#1e3a8a",
        marginBottom: 20,
        textTransform: "uppercase",
    },
    achievementText: {
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Inter",
        color: "#475569",
        lineHeight: 1.6,
        marginBottom: 40,
        paddingHorizontal: 60,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginBottom: 40,
    },
    statBox: {
        padding: 20,
        backgroundColor: "#f8fafc",
        borderRadius: 8,
        width: 160,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    statLabel: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        marginBottom: 8,
        fontFamily: "Inter",
    },
    statValue: {
        fontSize: 24,
        color: "#1e3a8a",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: "bold",
    },
    additionalStats: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 40,
        marginBottom: 40,
    },
    additionalStat: {
        alignItems: "center",
    },
    additionalStatLabel: {
        fontSize: 14,
        color: "#64748b",
        marginBottom: 4,
    },
    additionalStatValue: {
        fontSize: 16,
        color: "#1e3a8a",
        fontWeight: "bold",
    },
    footer: {
        position: "absolute",
        bottom: 40,
        left: 40,
        right: 40,
    },
    dateAndSignature: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
        paddingHorizontal: 40,
    },
    date: {
        fontSize: 14,
        fontFamily: "Inter",
        color: "#64748b",
    },
    signature: {
        fontSize: 14,
        fontFamily: "Inter",
        color: "#64748b",
        textAlign: "center",
    },
    signatureLine: {
        width: 200,
        height: 1,
        backgroundColor: "#cbd5e1",
        marginBottom: 5,
    },
    decorativeCorner: {
        position: "absolute",
        width: 40,
        height: 40,
    },
    topLeft: {
        top: 30,
        left: 30,
    },
    topRight: {
        top: 30,
        right: 30,
        transform: "rotate(90deg)",
    },
    bottomLeft: {
        bottom: 30,
        left: 30,
        transform: "rotate(-90deg)",
    },
    bottomRight: {
        bottom: 30,
        right: 30,
        transform: "rotate(180deg)",
    },
})

const DecorativeCorner = ({ style }: { style: any }) => (
    <Svg style={[styles.decorativeCorner, style]} viewBox="0 0 40 40">
        <Path d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z" fill="#2563eb" />
        <Path d="M0 0 L40 0 L40 1 L1 1 L1 40 L0 40 Z" fill="#93c5fd" />
    </Svg>
)

export function Certificate({ contestResult }: CertificateProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.decorativeBorder} />
                <View style={styles.innerBorder} />

                <DecorativeCorner style={styles.topLeft} />
                <DecorativeCorner style={styles.topRight} />
                <DecorativeCorner style={styles.bottomLeft} />
                <DecorativeCorner style={styles.bottomRight} />

                <View style={styles.header}>
                    <Text style={styles.title}>Certificate of Achievement</Text>
                    <Text style={styles.subtitle}>{contestResult.contestName}</Text>
                </View>

                <View style={styles.participantSection}>
                    <Text style={styles.presentedTo}>This certificate is presented to</Text>
                    <Text style={styles.participantName}>{contestResult.participantName}</Text>
                </View>

                <Text style={styles.achievementText}>
                    for demonstrating exceptional problem-solving skills and technical expertise in our competitive programming
                    contest. Their outstanding performance and dedication have earned them distinguished recognition among{" "}
                    {contestResult.totalParticipants} participants.
                </Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Final Rank</Text>
                        <Text style={styles.statValue}>#{contestResult.rank}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Total Points</Text>
                        <Text style={styles.statValue}>{contestResult.points}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>Problems Solved</Text>
                        <Text style={styles.statValue}>{contestResult.problemsSolved}</Text>
                    </View>
                </View>

                <View style={styles.additionalStats}>
                    <View style={styles.additionalStat}>
                        <Text style={styles.additionalStatLabel}>Total Time</Text>
                        <Text style={styles.additionalStatValue}>{contestResult.totalTime}</Text>
                    </View>
                    <View style={styles.additionalStat}>
                        <Text style={styles.additionalStatLabel}>Out of</Text>
                        <Text style={styles.additionalStatValue}>{contestResult.totalParticipants} Participants</Text>
                    </View>
                </View>

                <View style={styles.dateAndSignature}>
                    <View>
                        <Text style={styles.date}>Issued on {contestResult.date}</Text>
                    </View>
                    <View>
                        <View style={styles.signatureLine} />
                        <Text style={styles.signature}>Contest Director</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

