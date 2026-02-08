import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Text,
} from '@react-email/components';

interface TaskMarkedDoneEmailProps {
  taskName: string;
}

export const TaskMarkedDoneEmail = ({ taskName }: TaskMarkedDoneEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="bg-white border border-solid border-[#eee] rounded shadow-md mt-6 max-w-140 mx-auto p-6">
          <Heading className="text-black text-[20px] font-medium text-center mb-4">
            Task marked as done
          </Heading>

          <Text className="text-[#333] text-[16px] leading-6 text-center">
            The task &ldquo;{taskName}&rdquo; was marked as done.
          </Text>

          <Text className="text-[#666] text-[13px] leading-5 text-center mt-6">
            If you did not expect this change, please check your tasks dashboard.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

TaskMarkedDoneEmail.PreviewProps = {
  taskName: 'Buy groceries',
} as TaskMarkedDoneEmailProps;

export default TaskMarkedDoneEmail;
